import { Component, OnInit } from '@angular/core';
import { FollowingService } from './following.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  public followings = [];

  // Create a local variable for FollowingService
  // **Declear service as dependence at local component
  constructor(private _followingService: FollowingService) { }

  ngOnInit() {// Get called when component initialized

    // We have a FollowingService class in following.service
    // In the FollowingService class there is a getFollowing method to return the followings
    // In the constructor we create a instance of FollowingService: _followingService
    // Then we call the .getFollowing method to return followings
    // Then apply the values to the followings
    this._followingService.getFollowing()
        .subscribe(data => {
          this.followings = data;
          console.log(this.followings);
        });
  }
  
  newFollowing: string = "";
  /*When user add new following, create a dummy user*/
  addFollowing(newFollowing){
    if(newFollowing != ""){
      this.followings.push({id:10, username: newFollowing, status: "This is my MOTTO", img: "../../assets/img/logo.png"});
      this.newFollowing = "";
    }
  }

  deleteFollowing(id){
    for(let i = 0; i < this.followings.length; i++){
      if(this.followings[i]['id'] == id){
        if(i == 0){
          this.followings.splice(0, 1);
        }
        else{
          /*Delete the i-th content*/
          this.followings.splice(i, 1);
        }
        break;
      }
    }
    console.log(id);
  }

}
