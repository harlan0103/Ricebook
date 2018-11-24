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

export class PostsService {
  // back-end heroku url
  private _url = "https://hl74-ricebook-backend-final.herokuapp.com/";

  constructor(private http: HttpClient) { }

  /**
   * Return users post feed
   */
  backend_getPost(): Observable<any>{
    return this.http.get(this._url + "articles", httpOptions);
  }

  /**
   * Update post
   * If no commentId provided, update post content
   * If commentId is "-1", create new comment
   * If commentId is provided, update the comment
   * @param postId the post id
   * @param message the update message, could be new content or new comment
   * @param optional the comment id optional
   */
  backend_updatePost(postId, message, optional): Observable<any>{
    //console.log(this._url + "articles/" + postId);
    return this.http.put(this._url + "articles/" + postId, {text: message, commentId: optional}, httpOptions);
  }
}
