import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPosts } from '../../posts';
////////////////////////////
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  }), withCredentials: true
};
////////////////////////////
@Injectable({
  providedIn: 'root'
})
/*Regist this service in app.module*/
export class PostsService {
  //private _url: string = "../../assets/mock-data/posts.json";
  //private _url = "http://localhost:3000/"
  private _url = "https://hl74-ricebook-backend.herokuapp.com/";
  constructor(private http: HttpClient) { }
  const 
  /*
  getPost(): Observable<IPosts[]>{
    return this.http.get<IPosts[]>(this._url);

  }
  */
 ////////////////////////////////////////////////////////////////
  backend_getPost(): Observable<any>{
    return this.http.get(this._url + "articles", httpOptions);
  }
  //////////////////////////////////////////////////////////////
  getPost(){
    return this.http.get(this._url);
  }
}
