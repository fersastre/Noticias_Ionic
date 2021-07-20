import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['business','entertainment','general','health','science','sports','technology'];
  noticias: Article[] = [];

  constructor(private noticiasServices: NoticiasService){}

  ngOnInit() {

    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
   
  }

  CambioCategoria(event){
    console.log(event);
    this.noticias = [];
    this.cargarNoticias(event.detail.value);

  }


  cargarNoticias(categoria:string, loading?){
    this.noticiasServices.getTopHeadlinesCategoria(categoria)
    .subscribe( resp =>{
      this.noticias.push( ...resp.articles);
      console.log(resp);
      if(loading){
        loading.target.complete();
      }
    
    });

  }


  loadData(event){
    this.cargarNoticias(this.segment.value,event);

  }

}
