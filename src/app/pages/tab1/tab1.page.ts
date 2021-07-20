import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor( private noticiasService: NoticiasService) {}
  noticias: Article[] = [];

  ngOnInit(){
   this.cargasNoticias();
  }


  loadData(event){
    this.cargasNoticias(event);
  }


  cargasNoticias(event?){
    this.noticiasService.getTopHeadLines()
    .subscribe( resp =>{
      console.log(resp);
      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push( ...resp.articles);// De esta manera insertamos las noticias articulo por articulo spread ...
      if(event){
        event.target.complete();
      }
    
    
    })

}


}
