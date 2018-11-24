import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeadlineService } from '../headline/headline.service';
import { IFollowing } from 'src/app/following';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {
  // Create headlineService in constructor
  constructor(private _headlineService: HeadlineService, private http: HttpClient) { }

  // Logged in user avatar
  avatar = "";
  // New post img
  private postImg = "https://res.cloudinary.com/hnerpaq6a/image/upload/v1543000967/add.png";

  public postList = [];
  // Create user array
  public user = [];
  loginUser: string;

  //@Output() addNewPost = new EventEmitter();
  @Output() addNewPost = new EventEmitter();

  // Show or hide headline
  showStatusUpdate: boolean = false;
  showStatus: boolean = true;

  userStatus: string = localStorage.getItem("status");

  currentUser: IFollowing = {
    netID: "",
    username: "",
    status: "",
    following: "",
    follower: "",
    img: "",
  }

  /**
   * When paged is loaded
   */
  ngOnInit() {
    // Get user information when page loaded
    this.fontend_getHeadline();
    this.front_getAvatar();
  }

  /**
   * Service return current logged in user headline
   */
  fontend_getHeadline(){
    this._headlineService.backend_getHeadline().subscribe(data => {
      let response = data;
      this.userStatus = response.headlines[0].headline;
    });
  }

  /**
   * Service return current logged in user avatar
   */
  front_getAvatar(){
    this._headlineService.backend_getAvatar().subscribe(data => {
      if(data.avatars[0].avatar == ""){
        this.avatar = "https://res.cloudinary.com/hnerpaq6a/image/upload/v1542926593/Owls.png";
      }
      else{
        this.avatar = data.avatars[0].avatar;
      }
    });
  }

  /**
   * When user click "share" button
   * Create a new IPost class and add information to that newPost
   * Then push the new Post to up-to-date postList
   * Emit new List to the post.component
   * Then update postList in localStorage
  */
  front_addPost(){
    // Create new newPost obj
    var newP = {
      article: this.clearValue,
      picture: this.postImg
    }
    // Put new added post to the backend server
    this._headlineService.backend_newPost(newP).subscribe(data => {
      // Get all posts
      this.front_getPost();
    });
    // After add new post, clear the textarea and set img to default
    this.clearValue = "";
    this.postImg = "https://res.cloudinary.com/hnerpaq6a/image/upload/v1543000967/add.png";
  }

  /**
   * Get users post and following posts with limit of 10 from backend
   */
  front_getPost(){
    // Get user posts and following list from server
    this._headlineService.backend_getPost().subscribe(data => {
      this.postList = data.posts;
      //console.log(this.postList);
      this.addNewPost.emit(this.postList);
    });
  }

  /**
  * Clear user typed text
  */
  clearValue: string ='';
  clearOnClick() {
    this.clearValue ='';
  }

  /**
  * When click user headline, show the rditable textarea for updating user headline
  */
  clickUserStatus(){
    this.showStatus = false;
    this.showStatusUpdate = true;
  }

  /**
  * When click save button, update the new headline to server
  */
  clickUpdateStatus(){
    this.showStatus = true;
    this.showStatusUpdate = false;
    localStorage.setItem("status", this.userStatus);
    // Should PUT /headline to update the headline
    this._headlineService.backend_updateHeadline(this.userStatus).subscribe();
  }

  /**
   * Upload post image to Cloudinary
   * @param $event 
   */
  uploadImg(event: any){
    if(event.target.files && event.target.files[0]){
      // Set the img value
      var fd = new FormData();
      fd.append('image', event.target.files[0])
      // Get the image url in Cloudinary
      this._headlineService.uploadImage(fd).subscribe(data => {
        this.postImg = data.image;
      });
    }
  }
}
