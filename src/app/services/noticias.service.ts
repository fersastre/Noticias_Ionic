import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { respuestaTopHeadLines } from '../interfaces/interfaces';


const apiKey = environment.apikey;
const apiUrl = environment.apiUrl

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutaQuery<T>(query: string){
    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  };

  getTopHeadLines(){

    this.headlinesPage++;
    return this.ejecutaQuery<respuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`)
   // return this.http.get<respuestaTopHeadLines>('https://newsapi.org/v2/everything?q=tesla&from=2021-06-02&sortBy=publishedAt&apiKey=dfea24ab5dc54e54a9378770dda2ccec');
  }


  getTopHeadlinesCategoria( categoria: string) {
   
   if(this.categoriaActual === categoria){
     this.categoriaPage++;
   }
   else{
     this.categoriaPage = 1;
     this.categoriaActual = categoria;
   }
   
    // return this.http.get<respuestaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=dfea24ab5dc54e54a9378770dda2ccec')
    return this.ejecutaQuery<respuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`)
  }


}
