import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FollowingService } from './following.service';
import { IFollowing } from 'src/app/following';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  // followingList contains user's following
  public followingList = [];
  // contains all following information
  public followings = [];
  // posts contains all post feeds
  private posts = [];
  // posts contains user's posts and following posts
  private postList = [];
  //
  private deletePostList = [];

  // Params for new following check
  valid: boolean = false;
  duplicate: boolean = false;
  newFollowing: string = "";
  newFollowingObj: IFollowing;
  invalidUser:boolean = false;
  // Create a emitter to transfer value to parent component
  @Output() PostListEvent = new EventEmitter();

  constructor(private _followingService: FollowingService) { }

  ngOnInit() {// Get called when component initialized
    this.getFollowing();
    this.getFollowingList();
    this.getPosts();
    this.getPostsList();
  }

  /**
   * @getFollowing()
   * Get all following from service
   * Then store followings
   */
  getFollowing() {
    this._followingService.getFollowing().subscribe(data => {
      this.followings = data;
    })
  }

  /**
   * @getPosts()
   * Get all post feeds from service
   * Then store posts
   */
  getPosts() {
    this._followingService.getPost().subscribe(data => {
      this.posts = data;
    })
  }
  
  /**
   * @getFollowingList()
   * Get current user following list from localStorage
   */
  getFollowingList() {
    this.followingList = JSON.parse(localStorage.getItem("userFollowing"));
    console.log(this.followingList);
  }

  /**
   * @getPostsList()
   * Get current user posts and following posts
   */
  getPostsList() {
    this.postList = JSON.parse(localStorage.getItem("userPosts"));
    console.log(this.postList);
    //this.PostListEvent.emit(this.postList);
  }

  /**
   * @addFollowing(newFollowing)
   * Get user input newFollowing
   * Check if new following is valid and not duplicate
   * If valid and not duplicate
   * Store into followingList and update the localstorage
   */
  addFollowing(newFollowing){
    // Check for duplicate followings
    for(let i = 0; i < this.followingList.length; i++){
      if(this.followingList[i].username == newFollowing){
        this.duplicate = true;
      }
    }

    // Check for valid followings
    for(let j = 0; j < this.followings.length; j++){
      //console.log("all user: " + this.followings[j].username);
      if(this.followings[j].username == newFollowing){
        this.valid = true;
        this.newFollowingObj = this.followings[j];
      }
    }

    // Valid new following and not duplicate
    if(this.valid == true && this.duplicate == false){
      this.followingList.push(this.newFollowingObj);
      localStorage.setItem("userFollowing", JSON.stringify(this.followingList));
      this.addPost(newFollowing);
      this.invalidUser = false;
    }
    else{
      // Print out error message
      this.invalidUser = true;
    }
    
    // Initialize all params
    this.valid = false;
    this.duplicate = false;
    this.newFollowing = "";

    //location.reload();
  }

  /**
   * @deleteFollowing(username)
   * Delete user selected following user from following list
   * Then update the localStorage
   */
  deleteFollowing(username){
    for(let i = 0; i < this.followingList.length; i++){
      if(this.followingList[i]['username'] == username){
        if(i == 0){
          this.followingList.splice(0, 1);
          localStorage.setItem("userFollowing", JSON.stringify(this.followingList));
        }
        else{
          /*Delete the i-th content*/
          this.followingList.splice(i, 1);
          localStorage.setItem("userFollowing", JSON.stringify(this.followingList));
        }
      }
    }

    // Delete username feed
    this.deletePost(username);
    console.log("remove: " + username);
  }

  /**
   * @addPost(username)
   * Check new following's posts
   * Then add to the postList and update localStorage
   */
  addPost(username) {
    this.getPostsList();
    /*
    for(let i = 0; i < this.posts.length; i++){
      if(this.posts[i].author == username){
        this.postList.push(this.posts[i]);
      }
    }
    */
    this.postList = this._followingService.addPost(username, this.postList, this.posts);
    localStorage.setItem("userPosts", JSON.stringify(this.postList));
    this.PostListEvent.emit(this.postList);
  }

  /**
   * @deletePost(username)
   * Delete the user selected following
   * Update new posts list to the localStorage
   */
  deletePost(username) {
    this.getPostsList();
    this.deletePostList = this._followingService.deletePost(username, this.postList);
    localStorage.setItem("userPosts", JSON.stringify(this.deletePostList));
    this.PostListEvent.emit(this.deletePostList);
    this.deletePostList = [];
  }

}
