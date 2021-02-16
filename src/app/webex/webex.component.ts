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
  currentTeam: any;
  test: any;
  roomid: any;
  public loggedin: boolean;
  messages: any;
  incoming_message: boolean;

  constructor() {
    this.syncStatus = 'NONE';
    this.token = '';
    this.destination = '';
    this.incoming_message=false;
  }
  
  ngOnInit() {
    this.redirect_uri='https://arunprahbu333.web.app/logged'
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
    localStorage.setItem('auth', "Authorized")
    this.listenForWebex()
    this.loggedin = true
    this.webex.authorization.initiateLogin()
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
      localStorage.removeItem('auth')
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
    return this.webex.rooms.list({max:30})
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
    localStorage.setItem('auth', "Authorized")
    this.loggedin = true
    this.webex.once(`ready`, () => {
      console.log("READY", this.webex.credentials.supertoken)
      if (this.webex.credentials.supertoken){
        localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token)
        
      }
    });
    
  }

  async onCreateTeam(name: string) {
    try {
      this.currentTeam = await this.webex.teams.create({ name: name })
    } catch(error) {
      window.alert(error);
    }
  }
  
  async onListTeam() {
    return this.webex.teams.list()
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
 
  get isLoggedIn(): boolean {
    const auth = localStorage.getItem('auth');
    if(auth !== null){
    return true
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('auth')
  }

  onremove(id){
    this.webex.rooms.remove(id)
  }

  onUpdateTeamMember(email, teamid){
    this.webex.teamMemberships.create({
      personEmail: email,
      teamId: teamid
    
    });
  }

  onRemoveTeamMember(teams){
    this.webex.teamMemberships.remove(teams);
  }

  onSendMsg(id, msg){
    
    this.webex.messages.create({
      text: msg,
      roomId: id
    });
  }

  async onRecvMsg(){
    this.webex.messages.listen().then(() => {
      alert('listening to message events')
      this.webex.messages.on('created', (event) => this.msg(event));
      this.webex.messages.on('deleted', (event) => console.log(`Got a message:deleted event:\n${event}`));
    })
    .catch((e) => console.error(`Unable to register for message events: ${e}`));
  }

  async msg(ev){
    console.log(`Got a message:from ${ev.data.personEmail}, Message:\n${ev.data.text}`);
    // this.messages=ev.data.text
    this.incoming_message=true
    alert(`Got a message:from ${ev.data.personEmail}, Message:\n${ev.data.text}`)
  }

  ret(){
    return this.messages
  }

  FadeOutSuccessMsg() {
    setTimeout( () => {
        this.incoming_message = true;
     }, 4000);
 }
}