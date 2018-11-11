import { Injectable } from '@angular/core';
import { IPosts } from '../posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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

export class MainService {  
  constructor(private http: HttpClient) { }
///////////////////////////////////////////////////////////////////
  private _url = "http://localhost:3000/";

  logOutUser(){
    localStorage.setItem("currentUser", "");
    //log out from backend server
    return this.http.put(this._url + "logout", {}, httpOptions);
  }

  backend_getPosts(): Observable<any>{
    return this.http.get(this._url + "articles", httpOptions); 
  }
  
////////////////////////////////////////////////////////////////////
  searchKeyWord(searchKey: string, userPost){
    let postList = [];
    if(searchKey == ""){
      return userPost;
    }
    else {
      // Set the postList to null
      console.log(searchKey);
      // Check for the author
      for(let i = 0; i < userPost.length; i++){
        if(userPost[i].author.toLowerCase().includes(searchKey.toLowerCase()) 
        || userPost[i].body.toLowerCase().includes(searchKey.toLowerCase())){
          postList.push(userPost[i]);
        }
      }
    }
    return postList;
  }
}
