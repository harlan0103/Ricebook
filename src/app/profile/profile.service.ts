import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../profile';
import { userProfile } from '../user_profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // Create url
  private _url:string = "../../assets/mock-data/profile.json";
  constructor(private http: HttpClient) { }
  // Function to get user information
  getUser():Observable<IProfile[]>{
    return this.http.get<IProfile[]>(this._url);
  }

  fetchLoggedInUser(username, userProfile: IProfile[]) {
    //console.log(userProfile);
    //console.log(username);
    let profile: userProfile = {
      username: "",
      displayname: "",
      email: "",
      zipcode: "",
      dob: "",
      img: ""
    };

    //let profile: IProfile;
    for(let i = 0; i < userProfile.length; i++){
      if(username == userProfile[i].username){
        profile.username = userProfile[i].username;
        profile.displayname = userProfile[i].displayname;
        profile.email = userProfile[i].email;
        profile.dob = userProfile[i].dob;
        profile.zipcode = userProfile[i].zipcode;
        profile.img = userProfile[i].img;
      }
    }
    //console.log(profile);
    return profile;
  }
}
