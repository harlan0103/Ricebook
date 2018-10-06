import { Component, OnInit } from '@angular/core';
import { userProfile } from '../user_profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editable: boolean = false;
  diseditable: boolean = true;

  profile: userProfile = {
    img: "../../assets/img/userimg.jpg",
    username: "harlan",
    display: "Harlan0103",
    email: "hl74@rice.edu",
    dob: "1995-12-24",
    zipcode: "77030"
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

  constructor() { }

  ngOnInit() {
  }

}
