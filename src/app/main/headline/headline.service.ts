import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {
  private _url = "https://hl74-ricebook-backend-final.herokuapp.com/";
  // Add private http to the constructor
  constructor(private http: HttpClient) { }

  backend_getHeadline(): Observable<any>{
    return this.http.get(this._url + "headlines/", httpOptions);
  }

  backend_updateHeadline(headline){
    return this.http.put(this._url + "headline", {headline: headline}, httpOptions);
  }

  /**
   * Post new article to the database
   * @param newP The new post object contains post content and image
   */
  backend_newPost(newP): Observable<any>{
    return this.http.post(this._url + "article", {text: newP.article, image: newP.picture}, httpOptions);
  }

  backend_userPost(): Observable<any>{
    return this.http.get(this._url + "articles", httpOptions);
  }

  backend_getAvatar(): Observable<any>{
    return this.http.get(this._url + "avatars", httpOptions);
  }

  /**
   * Return current user post list
   */
  backend_getPost(): Observable<any>{
    return this.http.get(this._url + "articles", httpOptions);
  }

  /**
   * Upload image for post to the Cloudinary
   */
  uploadImage(df): Observable<any>{
    return this.http.put(this._url + "image", df, {
      // Since we are uploading a non-json object, then we need to change the header
      headers: new HttpHeaders({'Access-Control-Allow-Credentials': 'true'}),
      withCredentials: true
    })
  }
}
