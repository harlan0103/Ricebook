import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeadlineService } from '../headline/headline.service';
import { IFollowing } from 'src/app/following';
import { HttpClient } from '@angular/common/http';
import { IPosts } from 'src/app/posts';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {
  // Create headlineService in constructor
  constructor(private _headlineService: HeadlineService, private http: HttpClient) { }


  public postList = JSON.parse(localStorage.getItem("userPosts"));
  // Create user array
  private users = [];
  public user = [];
  loginUser: string;

  //@Output() addNewPost = new EventEmitter();
  @Output() addNewPost = new EventEmitter();

  // A new post
  public newPost: IPosts = {
    "img": "",
    "time": "Oct 16, 2018",
    "author": "",
    "article": "",
    "title": "dummy title",
    "comment": ""
  };

  showStatusUpdate: boolean = false;
  showStatus: boolean = true;

  userStatus: string = localStorage.getItem("status");

  statusUpdate: string;
  testUser: object = {};
  currentUser: IFollowing = {
    netID: "",
    username: "",
    status: "",
    following: "",
    follower: "",
    img: "",
  }

  /*When user click clear button for new post, set textarea value to ' '*/
  clearValue: string ='';
  clearOnClick() {
    console.log("clear btn");
    this.clearValue ='';
  }


  /**
   * @addPost()
   * When user click "share" button
   * Create a new IPost class and add information to that newPost
   * Then push the new Post to up-to-date postList
   * Emit new List to the post.component
   * Then update postList in localStorage
   */
  addPost() {
    this.postList = JSON.parse(localStorage.getItem("userPosts"));
    console.log(this.clearValue);
    // Create a new post object
    // Set the article
    this.newPost.article = this.clearValue;
    this.newPost.author = localStorage.getItem("currentUser");
    this.newPost.time = Date();
    this.postList.unshift(this.newPost);
    localStorage.setItem("userPosts", JSON.stringify(this.postList));
    this.addNewPost.emit(this.postList);
    this.clearValue = "";
  }




  /*When click userstatus, hide current user status and show the textarea for user to edit*/
  clickUserStatus(){
    this.showStatus = false;
    this.showStatusUpdate = true;
  }

  /*When click save button, save the update value and display the user status*/
  clickUpdateStatus(){
    this.showStatus = true;
    this.showStatusUpdate = false;
    localStorage.setItem("status", this.userStatus);
    /*
    this._headlineService.updateUser(this.currentUser).subscribe(data => {
      console.log("PUT Request is successful", this.currentUser);
    },
    error => {
      console.log("Error", error);
    });
    
    this.testUser = {
      "id": 2,
      "username": "Ecophobia",
      "status": "123", 
      "img": "../../assets/img/user2.png"
    }

    this.http.put("../../assets/mock-data/following.json", this.testUser).subscribe();
    */
  }

  ngOnInit() {
    // When page init
    // Use service object to call getUser method
    // Then subscribe observable and get data
    this._headlineService.getUser()
        .subscribe(data => {
          console.log(data);
          this.users = data;
          this.loginUser = localStorage.getItem("currentUser");
          for(let i = 0; i < this.users.length; i++){
            console.log(this.users[i].netID);
            if(this.users[i].username == this.loginUser){
              // We find the current user
              //this.user = this.users[i];
              this.currentUser.netID = this.loginUser;
              this.currentUser.status = this.users[i].status;
              // Set user status to the local storage and get the status
              this.currentUser.following = this.users[i].following.length;
              console.log(this.currentUser.following)
              this.currentUser.follower = this.users[i].follower.length;
              this.currentUser.img = this.users[i].img;
              console.log(this.currentUser.img);
            }
          }
        });
  }

}
