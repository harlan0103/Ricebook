import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FollowingService } from './following.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  // User enter a user name tobe followed
  newFollowing: string = "";

  // Boolean values for add new user to following list
  invalidUser:boolean = false;
  emptyUser: boolean = false;
  duplicateUser: boolean = false;

  // followingList contains user's following
  private followingList = [];

  // Create a emitter to transfer value to parent component
  @Output() PostListEvent = new EventEmitter();

  constructor(private _followingService: FollowingService) { }

  ngOnInit() {

    this.frontend_getFollowing();
  }

  /**
   * Get user following list from service
   * Append user list to the front page
   * Query following user detail
   */
  frontend_getFollowing(){
    this._followingService.backend_getFollowing().subscribe(data => {
      // Store following object into following list
      this.followingList = data.following;
      // Then get the user post list
      this.frontend_getPosts();
    });
  }

  /**
   * Add new user to the following list
   * First check the input field
   */
  frontend_addFollowing(newFollowing){
    // Check add user filed is not empty
    if(newFollowing == ""){
      this.emptyUser = true;
    }
    else{
      this._followingService.backend_addFollowing(newFollowing).subscribe(data => {
        // Invalid user
        if(data.result == "Invalid user"){
          this.invalidUser = true;
        }
        // Duplicate user
        else if(data.result == "Dupliacte"){
          this.duplicateUser = true;
        }
        // Find a valid user
        else{
          this.invalidUser = false; 
          this.duplicateUser = false;
        }
        // Get the updated following list
        this.frontend_getFollowing();
      });
      // Update all variables
      this.emptyUser = false;
      this.duplicateUser = false;
      this.newFollowing = "";
    }
  }

  /**
   * Delete user selected following
   */
  frontend_deleteFollowing(username){
    this._followingService.backend_deleteFollowing(username).subscribe(data => {
      // Call frontend_getFollowing to show the updated following list
      this.frontend_getFollowing();
    });
  }

  /**
   * Get users feeds from backend
   */
  frontend_getPosts(){
    this._followingService.backend_getPost().subscribe(data => {
      var postList = data.posts
      this.PostListEvent.emit(postList);
    });
  }
}