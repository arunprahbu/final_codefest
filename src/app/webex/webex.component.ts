import { Component, OnInit, Injectable} from '@angular/core';
import Webex from 'webex';
declare const ZipcodeHelp: any;

@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.css']
})
export class WebexComponent implements OnInit {
  token: string;
  registered: boolean;
  webex: any;
  webex1: any;
  syncStatus: string;
  currentMeeting: any;
  destination: string;
  redirect_uri: any;
  showMsg: boolean = false;
  currentRoom: any;
  test: any;
  public loggedin: boolean;

  constructor() {
    this.syncStatus = 'NONE';
    this.token = '';
    this.destination = '';
    this.loggedin = false;
  }
  
  ngOnInit() {
    this.redirect_uri='http://localhost:4200/logged'
  }
  Login() {
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          client_id: 'C7f815fdf652689ca6222d207d597ac55dc1a82449bdacf8294ba317106f56232',
          redirect_uri: this.redirect_uri,
          scope: 'spark:all spark:kms'
        }
      }
    })
    // this.loggedin
    this.listenForWebex()
    this.webex.authorization.initiateLogin()
    // this.token = localStorage.getItem('webex_token')
    //     alert(this.token)
  }
  onLogout(event) {
    if(this.webex) {
      if (this.webex.canAuthorize) {
        console.log('Already Logged in')
        this.webex.logout();
      }
      else {
        this.webex.logout();
        console.log('Cannot logout when no user is authenticated')
      }
      localStorage.removeItem('webex_token')
    }
  }

  async onCreateRoom(name: string) {
    try {
      this.currentRoom = await this.webex.rooms.create({ title: name })
      
    } catch(error) {
      window.alert(error);
    }
  }

  async onListRoom() {
    // this.test=this.webex.rooms.list({max: 3})
    // alert(this.test)

    return this.webex.rooms.list({max:20})
  }

  onAuth(event){
    this.redirect_uri = ZipcodeHelp();
    this.webex = Webex.init({
      config: {
        credentials: {
          client_id: 'C7f815fdf652689ca6222d207d597ac55dc1a82449bdacf8294ba317106f56232',
          redirect_uri: 'http://localhost:4200/logged',
          scope: 'spark:all spark:kms'
        }
      }
    });
    this.webex.once('ready', () => {
      if(event.target.id === "AuthBtn"){
        if(!this.webex.canAuthorize){
          event.preventDefault();
          this.webex.authorization.initiateLogin();
          this.showMsg= true;

        }
        else{alert("User Already Authenticated")}}
      if(event.target.id === "LogoutBtn"){
      alert(this.webex)
          if(this.webex.canAuthorize){
          event.preventDefault();
          this.webex.logout();
          }
          else{
            alert("No user has Authenticated")
          }
          localStorage.removeItem('webex_token')
        }

      
        if (this.webex.canAuthorize) {
          // Authorization is successful
          this.showMsg= true;
          // your app logic goes here
      
          // Change Authentication status to `Authenticated`
          // const authStatus = document.getElementById('authentication-status');
      
          // authStatus.innerHTML = 'Authenticated';
          // authStatus.style = 'color: green';
          
        }
      });
  }
  onInit() {
    this.webex = Webex.init({
        config: {
          meetings: {
            deviceType: 'WEB'
          }
        },
        credentials: {
          access_token: localStorage.getItem('webex_token')
        }
    })
    this.listenForWebex()
  }
  async listenForWebex() {
    this.webex.once(`ready`, () => {
      this.loggedin = true
      console.log("READY", this.webex.credentials.supertoken)
      if (this.webex.credentials.supertoken){
        localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token)
        
      }
    });
    
  }
  
  onSubmit() {
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        }
      },
      credentials: {
        access_token: this.token
      }
    });
  }

  onGetMe() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    alert(currentUser.token)
  }

  async onRegister() {
    try {
      await this.webex.meetings.register();
      this.registered = true;
      return this.registered
    } catch (error) {
      window.alert(error);
    }
  }

  async onUnregister() {
    try {
      await this.webex.meetings.unregister();
      this.registered = false;
    } catch (error) {
      console.error(error);
    }
  }

  async onSyncMeetings() {
    try {
      this.syncStatus = 'SYNCING';
      await this.webex.meetings.syncMeetings();
      this.syncStatus = 'SYNCED';
    } catch (error) {
      this.syncStatus = 'ERROR';
      console.error(error);
    }
  }

  async onCreateMeeting(destination) {
    try {
      this.currentMeeting = await this.webex.meetings.create(destination);
    } catch (error) {
      console.error(error);
    }
  }

  printMeeting() {
    if(this.currentMeeting) {
      return this.currentMeeting.id;
    }
    return 'No Meeting';
  }
  logout(){
    this.token=''
    localStorage.removeItem('isLoggedIn');
  }
  get isLoggedIn(): boolean {
    const webex_token = localStorage.getItem('webex_token');
    // return (webex_token !== null) ? true : false;
    return true
  }
}