import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IProfile } from '../../profile';
import { IFollowing } from 'src/app/following';
import { IPosts } from 'src/app/posts';
////////////////////////////
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  }), withCredentials: true
};
////////////////////////////
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  // Create the url for user profile json
  private _url:string = "../../assets/mock-data/profile.json";
  private _followingUrl:string = "../../assets/mock-data/following.json";
  private _postsUrl:string = "../../assets/mock-data/posts.json";
  
  // This is the loginUrl for /login////////////////////////////////////////
  private Login_url = "http://localhost:3000/login";
  /////////////////////////////////////////////////////////////////////////
  
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

  /////////////////////////////////////////////////////////////////////////////
  // New uer login
  ////////////////////////////////////////////////////////////////////////////
  userLogin(User): Observable<any>{
    console.log(User.username, User.password);
    return this.http.post(this.Login_url, {username: User.username, password: User.pwd}, httpOptions);
  }



    /**
   * loginAction()
   * @param username 
   * @param pwd 
   * @param profile
   * Check if user entered username and password are match and valid 
   */
  loginAction(username: string, pwd: string, profile: IProfile[]) {
    for(let i = 0; i < profile.length; i++){
      if(username == profile[i].username && pwd == profile[i].password){
        return true;
      }
      else{
        return false;
      }
    }
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
