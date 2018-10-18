import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  search:string = ""
  constructor(private _mainService: MainService) { }

  ngOnInit() {
  }

  // Using postList to connect with following.component and posts.component
  postList = [];
  public userPost = [];

  /**
   * onSearchClick()
   * When user click search button
   * Based on search bar content
   * Show specific content on the post view
   */
  onSearchClick() {    

    // Get the postList
    let userPost = JSON.parse(localStorage.getItem("userPosts"));
    this.postList = this._mainService.searchKeyWord(this.search, userPost);
    
    /*
    if(this.search == ""){
      return // do nothing
    }
    else {
      // Set the postList to null
      this.postList = [];
      console.log(this.search);
      // Get the postList
      let userPost = JSON.parse(localStorage.getItem("userPosts"));
      console.log(userPost);
      // Check for the author
      for(let i = 0; i < userPost.length; i++){
        if(userPost[i].author.toLowerCase().includes(this.search.toLowerCase()) 
        || userPost[i].article.toLowerCase().includes(this.search.toLowerCase())){
          this.postList.push(userPost[i]);
        }
      }
    }
    */
  }

  /**
   * @onClearSearch
   * When user click clear button on search bar
   * Clear search bar content
   * And show all posts on the post view
   */
  onClearSearch() {

  }

  postListEvent($event) {
    this.postList = $event;
  }

  Logout() {  
    this._mainService.logOutUser();
  }
}
