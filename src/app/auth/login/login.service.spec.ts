import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  /*
  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
  */

  const testUserProfile = [
    {"username": "harlan0103", "displayname": "harlan", "password": "12345678", "netID": "hl74", "email": "hl74@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/userimg.jpg", "status":"With greater power comes great resposibility"},
    {"username": "MusicCzar", "displayname": "", "password": "12345678", "netID": "ts1", "email": "ts1@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user_panda.png", "status": "Always do what you're afraid to do."},
    {"username": "Ecophobia", "displayname": "", "password": "12345678", "netID": "ts2", "email": "ts2@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user2.png", "status": "All hope abandon, ye who enter here."},
    {"username": "ProZack1986", "displayname": "", "password": "12345678", "netID": "ts3", "email": "ts3@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user3.png", "status": "the road is life."},
    {"username": "DeluxeVegan", "displayname": "", "password": "12345678", "netID": "ts4", "email": "ts4@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user4.png", "status": "We shall overcome."}
  ]

  it('should log in a previously registered user (not new users)', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service.loginAction("harlan0103", "12345678", testUserProfile)).toBeTruthy();
  });

  it('should not login an invalid user', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service.loginAction("notRegistUser", "12345678", testUserProfile)).toBe(false);
  });

  it('should update success message', () => {
    const service: LoginService = TestBed.get(LoginService);
    let validLogin = service.loginAction("harlan0103", "12345678", testUserProfile);
    if(validLogin == true){
      expect(service.ShowSuccessMessage()).toBe("User login successful");
    }
  })

  it('should update error message', () => {
    const service: LoginService = TestBed.get(LoginService);
    let validLogin = service.loginAction("notRegistUser", "12345678", testUserProfile);
    if(validLogin == false){
      expect(service.showErrorMessage()).toBe("Invalid username or wrong password!");
    }
  });


});
