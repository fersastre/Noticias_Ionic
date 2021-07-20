import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
    public toastController: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find(noti => {
      noti.title === noticia.title
    });
    if (!existe) {
      this.storage.create();
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
    this.presentToast('Se agrego a favoritos');



  }

  async cargarFavoritos() {
    this.storage.create();
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
    // .then(favoritos =>{

    //   console.log(favoritos);
    //   }
    // )
  }
  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title != noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Se borro de favoritos');
  }

  async presentToast(titulo: string) {
    const toast = await this.toastController.create({
      message: titulo,
      duration: 2000
    });
    toast.present();
  }


}
