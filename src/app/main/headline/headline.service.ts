import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../user';
import { Observable } from 'rxjs';
import { IFollowing } from 'src/app/following';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {
  // Create the url for user.json
  // following.json 改名 userInfo.json
  private _url: string = "../../assets/mock-data/following.json";

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


}
