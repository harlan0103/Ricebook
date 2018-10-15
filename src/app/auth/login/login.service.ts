import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../../profile';
import { IFollowing } from 'src/app/following';
import { IPosts } from 'src/app/posts';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Create the url for user profile json
  private _url:string = "../../assets/mock-data/profile.json";
  private _followingUrl:string = "../../assets/mock-data/following.json";
  private _postsUrl:string = "../../assets/mock-data/posts.json";
  
  constructor(private http: HttpClient) { }
  // Function to return user profile json
  getUser(): Observable<IProfile[]>{
    return this.http.get<IProfile[]>(this._url);
  }

  getFollowing(): Observable<IFollowing[]>{
    return this.http.get<IFollowing[]>(this._followingUrl);
  }

  getPosts(): Observable<IPosts[]>{
    return this.http.get<IPosts[]>(this._postsUrl);
  }
}
