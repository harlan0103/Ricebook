import { Component, OnInit } from '@angular/core';
import { HeadlineService } from '../headline/headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {
  // Create user array
  public user = [];

  showStatusUpdate: boolean = false;
  showStatus: boolean = true;

  userStatus: string = "With greater power comes great responsibility";

  statusUpdate: string;
  /*When user click clear button for new post, set textarea value to ' '*/
  clearValue: string ='';
  clearOnClick() {
    console.log("clear btn");
    this.clearValue ='';
  }

  /*When click userstatus, hide current user status and show the textarea for user to edit*/
  clickUserStatus(){
    this.showStatus = false;
    this.showStatusUpdate = true;
  }

  /*When click save button, save the update value and display the user status*/
  clickUpdateStatus(){
    this.showStatus = true;
    this.showStatusUpdate = false;
  }

  // Create headlineService in constructor
  constructor(private _headlineService: HeadlineService) { }

  ngOnInit() {
    // When page init
    // Use service object to call getUser method
    // Then subscribe observable and get data
    this._headlineService.getUser()
        .subscribe(data => {
          console.log(data);
          this.user = data;
        });
  }

}
