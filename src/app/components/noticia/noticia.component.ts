import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {


  @Input() noticia: Article;
  @Input() numero;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private localStorage: DataLocalService,
   ) { }

  ngOnInit() { console.log(this.enFavoritos); }




  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
    console.log(this.noticia.url);
  }

  async lanzarMenu() {

    let guardarBorrarBtn;


    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar de favoritos',
        cssClass: 'action-dark',
        icon: 'trash',
        handler: () => {
          this.localStorage.borrarNoticia(this.noticia);
          console.log('borrar de favorite');
          

        }
      };
    }
    else {
      guardarBorrarBtn = {
        text: 'Favorito',
        cssClass: 'action-dark',
        icon: 'star',
        handler: () => {
          this.localStorage.guardarNoticia(this.noticia);
          console.log('Share favorite');
    

        }
      };
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        guardarBorrarBtn,
        {
        text: 'Compartir',
        cssClass: 'action-dark',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
          console.log('Play compartir');
        }
      }, {
        text: 'Cancelar',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  


}
