import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MainService } from './main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  search:string = "";
  searchOn:boolean = true;
  searchOff:boolean = false;
  constructor(private _mainService: MainService, private router: Router) { }

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
    this._mainService.backend_getPosts().subscribe(r => {
      let userPost = r.posts;
      this.postList = this._mainService.searchKeyWord(this.search, userPost);
      this.searchOn = false;
      this.searchOff = true;
    });
    // Get the postList
    //let userPost = this.postList;
    //this.postList = this._mainService.searchKeyWord(this.search, userPost);
    //this.searchOn = false;
    //this.searchOff = true;
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
    this.search = "";
    this._mainService.backend_getPosts().subscribe(r => {
      //let userPost = r.posts;
      console.log(r.posts);
      this.postList = r.posts;
      this.searchOn = true;
      this.searchOff = false;
    });
  }

  postListEvent($event) {
    this.postList = $event;
  }

  Logout() {  
    this._mainService.logOutUser().subscribe(r => {
      console.log(r);
    });
    this.router.navigate(['/']);
  }
}
