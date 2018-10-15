import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // Create url
  private _url:string = "../../assets/mock-data/profile.json";
  constructor(private http: HttpClient) { }
  // Function to get user information
  getUser():Observable<IProfile[]>{
    return this.http.get<IProfile[]>(this._url);
  }
}
