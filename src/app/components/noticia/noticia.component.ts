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

  constructor(private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private localStorage: DataLocalService) { }

  ngOnInit() {}

 


  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
    console.log(this.noticia.url);
  }

  async lanzarMenu(){
    const actionSheet = await this.actionSheetController.create({
      buttons: [ {
        text: 'Favorito',
        cssClass: 'action-dark',
        icon: 'star',
        handler: () => {
          this.localStorage.guardarNoticia( this.noticia);
          console.log('Share favorite');
       
        }
      }, {
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
