import { Component, OnInit } from '@angular/core';
import { userProfile } from '../user_profile';
import { ProfileService } from './profile.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginService } from '../auth/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // a string to store user profile
  public currentUser = [];
  storageUser: string;
  editable: boolean = false;
  diseditable: boolean = true;

  profile: userProfile = {
    img: "",
    username: "",
    display: "",
    email: "",
    dob: "",
    zipcode: ""
  };

  /*When click update, update data and show edit button*/
  updateOnClick(){
    this.editable = false;
    this.diseditable = true;
  }

  /*When click edit, show edit page with update button*/
  editOnClick(){
    this.editable = true;
    this.diseditable = false;
  }

  constructor(private _profileService: LoginService) { }

  ngOnInit() {
    this._profileService.getUser().subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this.storageUser = localStorage.getItem("currentUser");
      console.log(this.storageUser);
      // Get the current logged in user data
      // 先从currentUser中找到目前存在localStorage中用户的名字
      // 再给设置好的profile类赋值
      for(let i = 0; i < this.currentUser.length; i++){
        if(this.currentUser[i].netID == this.storageUser){
          //this.profile.img = this.currentUser[i].img;
          this.profile.dob = this.currentUser[i].dob;
          this.profile.img = this.currentUser[i].img;
          this.profile.username = this.currentUser[i].username;
          this.profile.zipcode = this.currentUser[i].zipcode;
          this.profile.display = this.currentUser[i].displayname;
          this.profile.email = this.currentUser[i].email;
        }
      }
    });
  }

}
