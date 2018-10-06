import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {
  // Create the url for user.json
  private _url: string = "../../assets/mock-data/userInfo.json";

  // Add private http to the constructor
  constructor(private http: HttpClient) { }

  // Return user information function
  // getUser() method return Observable<IUser[]>
  getUser(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this._url);
  }
}
