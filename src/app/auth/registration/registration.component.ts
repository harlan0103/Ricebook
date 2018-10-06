import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../user_registration';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // Create a new userModel to recieve user input
  userModel = new UserInfo();

  registerClear() {
    this.userModel.name = "";
    this.userModel.display = "";
    this.userModel.email = "";
    this.userModel.phone = "";
    this.userModel.birth = null;
    this.userModel.zipcode = null;
    this.userModel.pwd = "";
    this.userModel.repwd = "";
  }

  constructor() { }

  ngOnInit() {
  
  }
  
}
