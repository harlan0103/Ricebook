import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: string[];
  constructor(private _postService: PostsService) { }
  
  ngOnInit() {
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

  }
}
