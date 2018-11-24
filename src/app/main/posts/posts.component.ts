import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})

export class PostsComponent implements OnInit {

  @Input() public postList = [];
  //public showComment = false;
  public userPosts = [];
  posts: string[];
  constructor(private _postService: PostsService) { }
  private editPostId = "";
  // Comment user want to check
  private showCommentPostId = "";
  private clickedComment = false;
  // Comment content for current user
  private comment = "";
  private loginUser = localStorage.getItem("currentUser");
  private comment_edit = ""
  // Able to edit comment
  private comment_id = "";
  private comment_editable = false;

  ngOnInit() {
    this.frontend_getPost();
  }

  /**
   * Get all user posts from backend limit of 10
   */
  frontend_getPost(){
    this._postService.backend_getPost().subscribe(r => {
      var response = r;
      this.postList = response.posts;
      //console.log(this.postList);
    });
  }

  /**
   * User click the comment
   * @param postId Clicked post
   */
  clickComment(postId){
    if(this.clickedComment == false){
      this.showCommentPostId = postId; 
      this.clickedComment = true;
    }
    else{
      this.showCommentPostId = "";
      this.clickedComment = false
    }     
  }

  /**
   * Return boolean value based on postId
   * @param postId For each postId
   */
  showComment(postId): boolean{
    if(postId == this.showCommentPostId){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Upload a new comment to the post
   * @param comment User comment
   */
  uploadNewComment(postId, comment){
    this._postService.backend_updatePost(postId,comment, "-1").subscribe(data => {
      this.frontend_getPost();
    });
    this.comment = "";
  }

  /**
   * Check if logged in user is eligible to edit the comment
   * @param commentAuthor comment author
   */
  commentEditEnable(commentAuthor): boolean{
    if(commentAuthor == this.loginUser){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Save comment id to the gloable comment id
   * And set comment_editable as true to show "save" btn
   */
  editComment(commentId){
    this.comment_id = commentId;
    this.comment_editable = true;
  }

  /**
   * Save edited comment to server
   * And hide "save" btn and show "edit" btn
   * @param commentId 
   * @param commentBody 
   */
  saveEditComment(postId, commentId, commentBody){
    this._postService.backend_updatePost(postId, commentBody, commentId).subscribe(data => {
      this.frontend_getPost();
    });
    this.comment_editable = false;
  }

  /**
   * Check if current logged in user is the post author
   * @param userId The author of the posts
   */
  checkPostUser(userId): boolean{
    var currentUser = localStorage.getItem("currentUser");
    if(currentUser == userId){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Set editPostId to the post id tobe edited
   * @param postId The post id
   */
  editPost(postId){
    this.editPostId = postId;
  }

  /**
   * Update changed post content to the backend database
   * @param postContent the changed post content
   */
  savePostChange(postContent){
    // Call backend to save the new post content
    this._postService.backend_updatePost(this.editPostId, postContent, null).subscribe();
    // Initialize post id
    this.editPostId = "";
  }

  /**
   * Hide the edit button if the postId is the same as "edit button clicked" post
   * And show the "save" button
   * @param postId the postId for every post
   */
  editable(postId): boolean{
    if(postId == this.editPostId){
      return false;
    }
    else{
      return true;
    }
  }

  /**
   * Hide the save button if the postId is not same as "edit button clicked" post
   * And show the "edit" button
   * @param postId the postId for every post
   */
  savable(postId): boolean{
    if(postId == this.editPostId){
      return true;
    }
    else{
      return false;
    }
  }
}
