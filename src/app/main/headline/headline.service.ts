import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../user';
import { Observable } from 'rxjs';
import { IFollowing } from 'src/app/following';
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
export class HeadlineService {
  // Create the url for user.json
  // following.json 改名 userInfo.json
  //private _url: string = "../../assets/mock-data/following.json";
  private _url = "http://localhost:3000/"
  // Add private http to the constructor
  constructor(private http: HttpClient) { }

  // Return user information function
  // getUser() method return Observable<IUser[]>
  getUser(): Observable<IFollowing[]>{
    return this.http.get<IFollowing[]>(this._url);
  }

  /**
   * Update the user status **test function
  */
  updateUser(userInfo: IFollowing): Observable<IFollowing>{
    return this.http.put<IFollowing>(this._url, userInfo);
  }

  ///////////////////////////////////////////////////////
  backend_getHeadline(): Observable<any>{
    return this.http.get(this._url + "headlines", httpOptions);
  }

  backend_updateHeadline(headline){
    return this.http.put(this._url + "headline", {headline: headline}, httpOptions);
  }

  backend_newPost(post): Observable<any>{
    return this.http.post(this._url + "article", {article: post.article, picture: post.picture}, httpOptions);
  }

  backend_userPost(): Observable<any>{
    return this.http.get(this._url + "articles", httpOptions);
  }
  ///////////////////////////////////////////////////////
}
