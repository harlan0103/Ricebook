import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPosts } from '../../posts';

@Injectable({
  providedIn: 'root'
})
/*Regist this service in app.module*/
export class PostsService {
  private _url: string = "../../assets/mock-data/posts.json";

  constructor(private http: HttpClient) { }
  const 
  /*
  getPost(): Observable<IPosts[]>{
    return this.http.get<IPosts[]>(this._url);

  }
  */

  getPost(){
    return this.http.get(this._url);
  }
}
