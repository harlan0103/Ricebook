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

export class RegistrationService {

  //private _url = "http://localhost:3000/register";
  private _url = "https://hl74-ricebook-backend-final.herokuapp.com/register";

  constructor(private http: HttpClient ) { }

  /**
   * Register a new user
   * @param UserInfo 
   */
  register(UserInfo): Observable<any>{
    //console.log(UserInfo.name, UserInfo.pwd, UserInfo.email, UserInfo.birth, UserInfo.zipcode);
    return this.http.post(this._url, {username: UserInfo.name, password: UserInfo.pwd, 
      email: UserInfo.email, zipcode: UserInfo.zipcode, dob: UserInfo.birth, phone: UserInfo.phone}, httpOptions);
  }
}
