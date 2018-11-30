import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../user_login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // Error message
  public errorMessage:string;

  //new login model
  loginModel = new UserLogin();
  // Create two valid param to check if username and password are valid
  validUser: boolean = false;
  showInvalidMsg: boolean = false;

  constructor(private _loginService: LoginService, private router:Router) { }

  ngOnInit() {
    this.initLocalStorage();
  }

  /**
   * @initLocalStorage()
   * Initialize the local storage
   */
  initLocalStorage() {
    localStorage.setItem("currentUser", "");
  }

  /**
   * Login with entered username and pwd
   * Check the invalid status and show error message
   */
  newLoginLogic(){
    this._loginService.userLogin(this.loginModel).subscribe(data => {
      if(data.result == "INVALID"){
        //console.log("No User");
        this.errorMessage = this._loginService.showErrorMessage();
        this.showInvalidMsg = true;
      }
      else if(data.result == "WRONGPASSWORD"){
        //console.log("Wrong password");
        this.errorMessage = this._loginService.showErrorMessage();
        this.showInvalidMsg = true;
      }
      else if(data.result == "success"){
        //console.log("Valid");
        this.showInvalidMsg = false;
        // Login successfuly store user information into local storage
        localStorage.setItem("currentUser", this.loginModel.username);
        this.router.navigate(['/main']);
      }
    })
  }

  /**
   * Login with google account
   */
  googleLogin(){
    this._loginService.googleLogin();
    //this.router.navigate(['/main']);
  }
}
