import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../user_registration';
import { AbstractControl } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registStatus:boolean = false;
  duplicateUser:boolean = false;
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

  constructor(private _registerService: RegistrationService) { }

  ngOnInit() {
  
  }

  registSuccess(){
    console.log(this.userModel);
    // Get the registration information and send it to the service
    this._registerService.register(this.userModel).subscribe(value => {
      //console.log(value);
      if(value.status == "success"){
        this.registStatus = true;
        this.duplicateUser = false;
        //this.registerClear();
      }
      else{
        this.duplicateUser = true;
      }
    }, err => {
      console.log(err);
    })
  }
}
