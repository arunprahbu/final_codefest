import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { WebexComponent } from '../webex/webex.component'
import Webex from 'webex';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  token: string;
  registered: boolean;
  web: any;
  webex: any;
  syncStatus: string;
  currentMeeting: any;
  destination: string;
  redirect_uri: any;
  showMsg: boolean = false;
  constructor(private webexComponent: WebexComponent,
    private router: Router) {
    this.syncStatus = 'NONE';
    this.token = '';
    this.destination = '';
   }

  ngOnInit(): void {
    this.webexComponent.onInit()
  }
  onSubmit(event) {
    this.webexComponent.onLogout(event)
    }
  onGetMe(){
    this.webexComponent.onGetMe()
  }
  onGet() {
    this.web = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        }
      },
      credentials: {
        access_token: 'YzlhZWMyZjEtZmZmZi00NDYwLTkwMzItMmQ3ZmVjOTlhNTUzMDk3NTE0MGQtM2Nm_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f'
      }
    });
    const response = this.web.meetings.get('me');
    debugger;
  }
  call(){
    this.router.navigate(['/call'])
  }
  room(){
    this.router.navigate(['/room'])
  }
  team(){
    this.router.navigate(['/teams'])
  }
  
  
}
