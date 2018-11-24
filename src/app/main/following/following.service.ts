import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Http header
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})

export class FollowingService {
  //private _url = "http://localhost:3000/"
  private _url = "https://hl74-ricebook-backend-final.herokuapp.com/";

  constructor(private http: HttpClient) { }

  /**
   * Get the current user following list
   */
  backend_getFollowing(): Observable<any>{
    return this.http.get(this._url + "following", httpOptions);
  }

  /**
   * Add user to following list
   * @param uid username to be added
   */
  backend_addFollowing(uid): Observable<any>{
    return this.http.put(this._url + "following/" + uid, {}, httpOptions);
  }

  /**
   * Delete user from following list
   * @param uid username to be deleted
   */
  backend_deleteFollowing(uid): Observable<any>{
    return this.http.delete(this._url + "following/" + uid, httpOptions);
  }

  /**
   * Get all users headline in folowing list
   * @param userlist a string contains all following user
   */
  backend_getFollowingHeadline(userList): Observable<any>{
    return this.http.get(this._url + "headlines/" + userList, httpOptions);
  }

  /**
   * Get all users avatars in following list
   * @param userList a string contains all following user
   */
  backend_getFollowingAvatar(userList): Observable<any>{
    return this.http.get(this._url + "avatars/" + userList, httpOptions);
  }

  /**
   * Return users post feeds
   */
  backend_getPost(): Observable<any>{
    return this.http.get(this._url + "articles", httpOptions);
  }
}
