import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../user_login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public profile = [];
  public userFollowing = [];
  public currentUserFollowingList = [];
  public postsFeed = [];
  public userPosts = [];
  public errorMessage:string;

  //new login model
  loginModel = new UserLogin();
  // Create two valid param to check if username and password are valid
  validUser: boolean = false;
  showInvalidMsg: boolean = false;
  //validPwd: boolean = false;
  private userpwd: string;
  constructor(private _loginService: LoginService, private router:Router) { }

  ngOnInit() {
    this.initLocalStorage();
    this.getUserInfo();
    this.getFollowingInfo();
    this.getPosts();
  }

  /**
   * @initLocalStorage()
   * Initialize the local storage
   */
  initLocalStorage() {
    localStorage.setItem("userFollowing", "");
    localStorage.setItem("userPosts", "");
    localStorage.setItem("currentUser", "");
    localStorage.setItem("status", "");
  }

  /**
   * @getUserInfo()
   * Function to get all user information from service getUser function
   * Save all user information into profile array
   */
  getUserInfo() {
    this._loginService.getUser().subscribe(data => {
      this.profile = data;
    })
  }

  /**
   * @getFollowingInfo()
   * Function to get the following information
   * Store all following information into the userFollowing
   */
  getFollowingInfo() {
    this._loginService.getFollowing().subscribe(data => {
      this.userFollowing = data;
      console.log(this.userFollowing[0]);
    })    
  }
  
  /**
   * @getPosts()
   * Function to get all posts from mock-data
   */
  getPosts() {
    this._loginService.getPosts().subscribe(data => {
      this.postsFeed = data;
      console.log(this.postsFeed);
    })
  }
  
  /**
   * @findUserFollowing(username)
   * Function to get current user's following list
   */
  findUserFollowing(username) {
    for(let i = 0; i < this.userFollowing.length; i++){
      console.log(this.userFollowing[i].username);
      // For all users in the following find the current user and get its following list
      if(this.userFollowing[i].username == username){
        console.log("we found the user");
        for(let j = 0; j < this.userFollowing[i].following.length; j++){
          // push users following into the currentUserFolloingList
          //this.currentUserFollowingList.push(this.userFollowing[i].following[j].netID);
          this.storeFollowings(this.userFollowing[i].following[j].netID);
        }
      }
    }
    // Store current user following list to the localstroage
    localStorage.setItem("userFollowing", JSON.stringify(this.currentUserFollowingList));
  }

  /**
   * @storeFollowings()
   * Store user's following detail information into localstorage
   */
  storeFollowings(netID) {
    for(let i = 0; i < this.userFollowing.length; i++){
      if(this.userFollowing[i].netID == netID){
        this.currentUserFollowingList.push(this.userFollowing[i]);
      }
    }
  }

  /**
   * @findUserPosts(username)
   * By pass the username
   * Find all relative posts including user posts and following posts
   * Store posts into localstorage
   */
  findUserPosts(username) {
    for(let i = 0; i < this.postsFeed.length; i++){
      if(this.postsFeed[i].author == username){
        this.userPosts.push(this.postsFeed[i]);
      }
    }
    for(let i = 0; i < this.currentUserFollowingList.length; i++){
      for(let j = 0; j < this.postsFeed.length; j++){
        if(this.currentUserFollowingList[i].username == this.postsFeed[j].author){
          this.userPosts.push(this.postsFeed[j]);
        }
      }
    }
    localStorage.setItem("userPosts", JSON.stringify(this.userPosts));
  }

  /**
  * @checkUserValid()
  * Check if entered username is registered
  * Or password is correct
  */
  checkUserValide() {
    this.validUser = false;
    console.log(this.loginModel.username);

    for(let i = 0; i < this.profile.length; i++){
      if(this.loginModel.username == this.profile[i].username && this.loginModel.pwd == this.profile[i].password){
        // If the login username and password are match and correct
        console.log("valid user");
        this.validUser = true;
        this.showInvalidMsg = false;
        // Set netID and status to the localStorage
        localStorage.setItem('currentUser', this.profile[i].username);
        localStorage.setItem('status', this.profile[i].status);
        this.findUserFollowing(this.loginModel.username);
        this.findUserPosts(this.loginModel.username);
        this.router.navigate(['/main']);
      }
      
    }
    if(this.validUser != true){
      this.errorMessage = this._loginService.showErrorMessage();
      console.log("invalid user"); 
      this.showInvalidMsg = true;
    }
    // succesful login
  }

}
