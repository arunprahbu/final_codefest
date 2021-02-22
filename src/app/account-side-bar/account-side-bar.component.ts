import { Component, OnInit } from '@angular/core';
import { WebexComponent } from '../webex/webex.component';

@Component({
  selector: 'app-account-side-bar',
  templateUrl: './account-side-bar.component.html',
  styleUrls: ['./account-side-bar.component.css']
})
export class AccountSideBarComponent implements OnInit {

  details:Promise<{}>|null = null;
  imageUrl:Promise<string>|null = null;
  displayName:Promise<string>|null = null
  rooms;

  constructor(private webexComponent:WebexComponent) { }
  
  async ngOnInit(): Promise<void>{
    // this.webex.onInit()
    // this.getPersonalDetails();
    this.webexComponent.onInit();
    this.getPersonalDetails();
  }
  
  async getPersonalDetails() {
    await this.webexComponent.getPersonalDetails().then(
      (details) => {
        this.details = new Promise<{}>((resolve, reject) => {
          resolve(details);
        });
        this.imageUrl = new Promise<string>((resolve, reject) => {
          resolve(details.avatar);
        });
        this.displayName = new Promise<string>((resolve, reject) => {
          resolve(details.displayName);
        });
      }
    );
  }

}
