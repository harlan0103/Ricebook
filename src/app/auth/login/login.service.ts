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

export class LoginService {

  private Login_url = "http://localhost:3000/login";
  //private Login_url = "https://hl74-ricebook-backend-final.herokuapp.com/login";
  //private _url = "https://hl74-ricebook-backend-final.herokuapp.com/"
  constructor(private http: HttpClient) { }

  /**
   * User login action connect with backend
   * @param User Entered username
   */
  userLogin(User): Observable<any>{
    return this.http.post(this.Login_url, {username: User.username, password: User.pwd}, httpOptions);
  }

  /**
   * Google login 
   */
  googleLogin(){
    window.location.href = this.Login_url + "/auth/google";
  }

  /**
   * showSuccessMessage()
   * When user successLogged in
   * Return the success message
   */
  ShowSuccessMessage(){
    let message = "User login successful";
    return message;
  }

  /**
   * showErrorMessage()
   * When user entered a invalid username or wrong password
   * Show this message
   */
  showErrorMessage(){
    let message = "Invalid username or wrong password!";
    return message;
  }
  
}
