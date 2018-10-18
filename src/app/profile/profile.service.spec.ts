import { TestBed } from '@angular/core/testing';
import { userProfile } from '../user_profile';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  /*
  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
  */

  /**
   * Test case: should fetch the logged in users profile information
   */
  it('should fetch the logged in users profile information', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    //const mock_user = {"username": "DeluxeVegan", "displayname": "", "email": "ts4@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "img": "../../assets/img/user4.png"};
    
    const mock_user: userProfile = {
      username: "DeluxeVegan",
      displayname: "",
      email: "ts4@rice.edu",
      zipcode: "77030",
      dob: "1996-01-03",
      img: "../../assets/img/user4.png"
    };

    const testUserProfile = [
      {"username": "harlan0103", "displayname": "harlan", "password": "12345678", "netID": "hl74", "email": "hl74@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/userimg.jpg", "status":"With greater power comes great resposibility"},
      {"username": "MusicCzar", "displayname": "", "password": "12345678", "netID": "ts1", "email": "ts1@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user_panda.png", "status": "Always do what you're afraid to do."},
      {"username": "Ecophobia", "displayname": "", "password": "12345678", "netID": "ts2", "email": "ts2@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user2.png", "status": "All hope abandon, ye who enter here."},
      {"username": "ProZack1986", "displayname": "", "password": "12345678", "netID": "ts3", "email": "ts3@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user3.png", "status": "the road is life."},
      {"username": "DeluxeVegan", "displayname": "", "password": "12345678", "netID": "ts4", "email": "ts4@rice.edu", "zipcode": "77030", "dob": "1996-01-03", "phone": "123-123-1233", "img": "../../assets/img/user4.png", "status": "We shall overcome."}
    ]
    // Check each component if they are matching with supposed value
    expect(service.fetchLoggedInUser("DeluxeVegan", testUserProfile).username).toBe(mock_user.username);
    expect(service.fetchLoggedInUser("DeluxeVegan", testUserProfile).displayname).toBe(mock_user.displayname);
    expect(service.fetchLoggedInUser("DeluxeVegan", testUserProfile).email).toBe(mock_user.email);
    expect(service.fetchLoggedInUser("DeluxeVegan", testUserProfile).zipcode).toBe(mock_user.zipcode);
    expect(service.fetchLoggedInUser("DeluxeVegan", testUserProfile).dob).toBe(mock_user.dob);
    expect(service.fetchLoggedInUser("DeluxeVegan", testUserProfile).img).toBe(mock_user.img);
  });
});
