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

export class ProfileService {
  constructor(private http: HttpClient) { }

  private _url = "https://hl74-ricebook-backend-final.herokuapp.com/";

  // Get user email
  backend_getEmail(): Observable<any>{
    return this.http.get(this._url + "email", httpOptions);
  }

  // Get user date of birth
  backend_getDob(): Observable<any>{
    return this.http.get(this._url + "dob", httpOptions);
  }

  // Get user zipcode
  backend_getZipcode(): Observable<any>{
    return this.http.get(this._url + "zipcode", httpOptions);
  }

  // Get user img
  backend_getImg(): Observable<any>{
    return this.http.get(this._url + "avatars", httpOptions);
  }

  // Update user email
  backend_updateEmail(email){
    return this.http.put(this._url + "email", {email: email}, httpOptions);
  }

  // Update user zipcode
  backend_updateZipcode(zipcode){
    return this.http.put(this._url + "zipcode", {zipcode: zipcode}, httpOptions);
  }
  
  // Upload a new avatar
  backend_uploadAvatar(avatar): Observable<any>{
    return this.http.put(this._url + "avatar", avatar, {
      // Since we are uploading a non-json object, then we need to change the header
      headers: new HttpHeaders({'Access-Control-Allow-Credentials': 'true'}),
      withCredentials: true
    });
  }
}
