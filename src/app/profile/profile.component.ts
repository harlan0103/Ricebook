import { Component, OnInit } from '@angular/core';
import { userProfile } from '../user_profile';
import { ProfileService } from './profile.service';
import { LoginService } from '../auth/login/login.service';
import { flatten } from '@angular/compiler';
import { MainService } from '../main/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  // boolean values to show edit or update page
  editable: boolean = false;
  diseditable: boolean = true;
  // Set the default img
  defaultImg = "https://res.cloudinary.com/hnerpaq6a/image/upload/v1542926593/Owls.png";
  // Conditions to show or hide link and unlink button
  showLink: boolean = false;
  showUnLink: boolean = false;
  // Link account information
  linkUsername: String = "";
  linkPwd: String = "";
  // Error in link
  invalidMsg: String = ""
  showMsg: boolean = false;

  profile: userProfile = {
    img: "",
    username: "",
    displayname: "",
    email: "",
    dob: "",
    zipcode: ""
  };

  /**
   * When click update button show updated page and edit button
   */
  updateOnClick(){
    this.editable = false;
    this.diseditable = true;
    // Send update value to service and update in backend
    this.pService.backend_updateEmail(this.profile.email).subscribe();
    this.pService.backend_updateZipcode(this.profile.zipcode).subscribe();
  }

  /**
   * When click edit button show edit page and update button
   */
  editOnClick(){
    this.editable = true;
    this.diseditable = false;
  }

  constructor(private _profileService: LoginService, private pService: ProfileService, private mainService: MainService, private router: Router) {}

  ngOnInit() {
    /**
     * Functions to get user profiles when page loaded
     */
    this.front_getEmail();
    this.front_getDob();
    this.front_getZip();
    this.front_getImg();
    this.userLink();
  }

  /**
   * Service get current login user email and send to component
   */
  front_getEmail(){
    this.pService.backend_getEmail().subscribe(data => {
      this.profile.username = data.username[0];
      this.profile.email = data.email;
    });
  }

  /**
   * Service get current login user date of birth and send to component
   */
  front_getDob(){
    this.pService.backend_getDob().subscribe(data => {
      this.profile.dob = data.dob;
    });
  }

  /**
   * Service get current login user zipcode and send to component
   */
  front_getZip(){
    this.pService.backend_getZipcode().subscribe(data => {
      this.profile.zipcode = data.zipcode;
    });
  }

  /**
   * Service get current login user img and send to component
   */
  front_getImg(){
    this.pService.backend_getImg().subscribe(data => {
      // For the new registered user we apply the default img
      if(data.avatars[0].avatar == ""){
        this.profile.img = this.defaultImg;
      }
      else{
        this.profile.img = data.avatars[0].avatar;
      }
    });
  }

  /**
   * Get user selected image
   */
  uploadImg(event: any){
    if(event.target.files && event.target.files[0]){
      var fd = new FormData();
      // Append image file to FormData
      fd.append('image', event.target.files[0]);
      // Display the key/value pairs
      this.pService.backend_uploadAvatar(fd).subscribe(data => {
        this.profile.img = data.avatar;
      });
    }
  }

  /**
   * Check user link status
   */
  userLink(){
    this.pService.backend_getUser().subscribe(data => {
      //console.log(data);

      // This is a third party login, show link button
      if(data.authID != "" && data.status == ""){
        this.showLink = true;
        this.showUnLink = false;
      }
      // This is a linked account, show unlink button
      else if(data.authID != "" && data.status == "linked"){
        this.showLink = false;
        this.showUnLink = true;
      }
      // This is a local account, not to show any button
      else{
        this.showLink = false;
        this.showUnLink = false;
      }
    })
  }

  /**
   * Link a logined third-party account with local account
   */
  linkAccount(){
    //console.log(this.linkUsername + ";" + this.linkPwd);
    // Now have login username and password
    // Send to backend to merge two account
    // Get return message
    // 1.No such user  2.Wrong password  3.Account is not local  4.success
    this.pService.backend_checkLink(this.linkUsername, this.linkPwd).subscribe(data => {
      if(data.result == "INVALID"){
        this.showInvalidMsg("Invalid user!");
      }
      else if(data.result == "WRONGPWD"){
        this.showInvalidMsg("Wrong password!");
      }
      else if(data.result == "LINKED"){
        this.showInvalidMsg("Account is linked!");
      }
      // Success status
      else{
        this.showMsg = false;
        this.invalidMsg = "";
        // Then clear user session and log out
        //console.log("SUCCESS");
        this.mainService.logOutUser().subscribe();
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Show invalid message
   */
  showInvalidMsg(msg){
    this.invalidMsg = msg;
    this.showMsg = true;
  }

  /**
   * Unlink a third-party account with local account
   */
  unLinkAccount(){
    // Call a function to unlink both account
    this.pService.backend_unlink().subscribe(data => {
      if(data.result == "success"){
        this.mainService.logOutUser().subscribe();
        this.router.navigate(['/']);
      }
    })
  }
}
