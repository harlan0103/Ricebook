import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../user_login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //new login model
  loginModel = new UserLogin();
}
