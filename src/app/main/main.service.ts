import { Injectable } from '@angular/core';
import { IPosts } from '../posts';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  logOutUser(){
    localStorage.setItem("currentUser", "");
  }

  searchKeyWord(searchKey: string, userPost: IPosts[]){
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
        || userPost[i].article.toLowerCase().includes(searchKey.toLowerCase())){
          postList.push(userPost[i]);
        }
      }
    }
    return postList;
  }
}
