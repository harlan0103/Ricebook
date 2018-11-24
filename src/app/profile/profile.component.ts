import { Component, OnInit } from '@angular/core';
import { userProfile } from '../user_profile';
import { ProfileService } from './profile.service';
import { LoginService } from '../auth/login/login.service';

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

  constructor(private _profileService: LoginService, private pService: ProfileService) {}

  ngOnInit() {
    /**
     * Functions to get user profiles when page loaded
     */
    this.front_getEmail();
    this.front_getDob();
    this.front_getZip();
    this.front_getImg();
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
}
