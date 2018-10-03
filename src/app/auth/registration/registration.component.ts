import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../user_registration';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  }
  
  // Create a new userModel to recieve user input
  userModel = new UserInfo();
  
}
