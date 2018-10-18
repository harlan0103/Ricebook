import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() public postList = [];
  public showComment = false;
  public userPosts = [];
  posts: string[];
  constructor(private _postService: PostsService) { }
  
  ngOnInit() {
    //this.getPostsList();
    //this._postService.getPost().subscribe(data => this.posts = data);
    /*
    this._postService.getPost().subscribe(data => {
      this.posts = data;
      console.log(this.posts[0]);
      console.log(data);
    });
    */
    this._postService.getPost().subscribe(response => {this.posts = response["posts"]});
    console.log(this.posts);
    // When init the page, load the user posts from localStorage
    this.postList = JSON.parse(localStorage.getItem("userPosts"));
  }

  clickComment(){
    if(this.showComment == true){
      this.showComment = false;
    }
    else{
      this.showComment = true;
    }
  }
}
