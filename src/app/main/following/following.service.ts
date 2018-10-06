import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFollowing } from '../../following';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  // Create a property point to the json file
  private _url: string = "../../assets/mock-data/following.json";

  // In order to use HTTP, create a dependence of http in constructor
  // Then we can use http as instance to refer the HttpClient
  constructor(private http: HttpClient) { 
  }

  // Create a function to return the following data in the service
  // STEP1: Define the following class
  // STEP2: Register FollowingService in app.module

  // Return a observable array
  getFollowing(): Observable<IFollowing[]>{
    /* Using hard code variables
    return [
      {"id":1, "username":"test1", "status":"something"},
      {"id":2, "username":"test2", "status":"something"},
      {"id":3, "username":"test3", "status":"something"},
      {"id":4, "username":"test4", "status":"something"},
    ]
    */

    // Get data from HTTP calls and request data from url
    return this.http.get<IFollowing[]>(this._url);
    // .get return an observable
    // Create a following interface
  }
}
