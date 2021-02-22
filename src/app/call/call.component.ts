import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { WebexComponent } from '../webex/webex.component'
import Webex from 'webex';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import {SharedService} from '../shared/shared.service'

declare const bindMeetingEvents: any;
declare const joinMeeting: any;

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.sass'],
  
})
export class CallComponent implements OnInit {
  // @ViewChild("video") video: ElementRef;
  @Input() data: string
  @ViewChild('video', { static: true }) private video: any;
  @ViewChild('audio', { static: true }) private audio: any;
  @ViewChild('remotevideo', { static: true }) private remotevideo: any;
  @ViewChild('localshare', { static: true }) private localshare: any;
  @ViewChild('remoteshare', { static: true }) private remoteshare: any;
  Token: string;
  register: any;
  invitee: string;
  webex: any;
  registered: boolean;
  meet: any;
  media: any;
  incoming_meeting: any;
  added_incoming: any;
  sendVideo: boolean;
  sendAudio: boolean;
  incoming_call: any;
  sendShare: boolean;
  list: boolean;
  audioMute: boolean;
  videoMute: boolean;
  callee:any; 

  constructor(private webexComponent: WebexComponent,private route: ActivatedRoute,private shared:SharedService) { 
    
    this.Token=localStorage.getItem('register_token')
    // this.invitee=localStorage.getItem('invite')
    this.sendAudio = true
    this.sendVideo = true
    this.audioMute=false;
    localStorage.setItem('invitee', this.shared.getMssg())
    this.invitee=localStorage.getItem('callee')
    // alert(this.route.snapshot.paramMap.get('email'))
  }

  ngOnInit(): void {
  // this.invitee=this.route.snapshot.paramMap.get('email')
//  alert(this.route.snapshot.paramMap.get('email'))
  // alert(this.invitee)
  // this.invitee=this.shared.getMssg()
  // localStorage.setItem('invitee', this.shared.getMssg())
  this.onRegister()
  }
  Init(){

    this.webex = Webex.init({
      config: {
        logger: {
          level: 'debug'
        },
        meetings: {
          reconnection: {
            enabled: true
          }
        }
        // Any other sdk config we need
      },
      credentials: {
        access_token: localStorage.getItem('webex_token')
      }
       
  })
  this.listenForIncoming()
  }
  async onRegister() {
    try {
      // alert(this.sideb.sendid())
      // localStorage.setItem('register_token',this.Token)
      this.Init()
      await this.webex.meetings.register();
      this.registered = true;
      // return this.registered
    } catch (error) {
      window.alert(error);
    }
  }
  async listenForIncoming(){
    this.webex.meetings.on('meeting:added', (addedMeetingEvent) => {
      if (addedMeetingEvent.type === 'INCOMING') {
        const addedMeeting = addedMeetingEvent.meeting;
        this.incoming_meeting=  addedMeetingEvent
        addedMeeting.acknowledge(addedMeetingEvent.type)
          .then(() => {
 
            this.added_incoming= addedMeeting
            this.incoming_call = true;
          });
      }
    });
  }
  async incoming_attend(){
    if (this.incoming_call = true){
              this.incoming_call = false
              this.bindMeetingEvents(this.added_incoming);
              return this.joinMeeting(this.added_incoming);}
              else{this.added_incoming.decline()}
  }
  incoming(){
    this.incoming_call = true;
    return true
  }
  token(){
    // alert(this.Token)
    // this.register = this.webexComponent.onRegister()
    alert(this.register)
    
  }
  onDial(){
    localStorage.setItem('invitee',this.invitee)

    return this.webex.meetings.create(localStorage.getItem('invitee')).then((meeting) => {
      this.meet=meeting
      this.bindMeetingEvents(this.meet);
      return this.joinMeeting(this.meet)

    })
    .catch((error) => {
      console.error(error);
    });
  }
  dial(){
    // this.webexComponent.onDial()

  }
  onhangup(){
    if(this.meet){
    this.meet.leave()}
    else{this.added_incoming.leave()}
    
    // try{
    //   if(this.incoming_meeting != "undefined")
    //   this.incoming_meeting.leave()
    //   this.added_incoming.leave()
    // }catch (error) {
      
    // }
}

  async bindMeetingEvents(meeting) {
    meeting.on('error', (err) => {
      console.error(err);
    });
  
    meeting.on('media:ready', (media) => {
      if (!media) {
        return;
      }
      if (media.type === 'local') {
        const _video = this.video.nativeElement;
        _video.muted = "muted";
        _video.srcObject = media.stream;
      }
      if (media.type === 'remoteVideo') {
        const _rvideo = this.remotevideo.nativeElement;
        _rvideo.srcObject = media.stream;
      }
      if (media.type === 'remoteAudio') {
        const _audio = this.audio.nativeElement;
        _audio.srcObject = media.stream;
      }
      if (media.type === 'remoteShare') {
        const _rshare = this.remoteshare.nativeElement;
        _rshare.srcObject = media.stream;
      }
      // if (media.type === 'localShare') {
      //   const _lshare = this.localshare.nativeElement;
      //   _lshare.srcObject = media.stream;
      // }
    });
  
    // Handle media streams stopping
    meeting.on('media:stopped', (media) => {
      if (media.type === 'local') {
        const _video = this.video.nativeElement;
        _video.srcObject = null;
      }
      if (media.type === 'remoteVideo') {
        const _rvideo = this.remotevideo.nativeElement;
        _rvideo.srcObject = null;
      }
      if (media.type === 'remoteAudio') {
        const _audio = this.audio.nativeElement;
        _audio.srcObject = null;
      }
      if (media.type === 'localShare') {
        const _lshare = this.localshare.nativeElement;
        _lshare.srcObject = null;
      }
      if (media.type === 'remoteShare') {
        const _rshare = this.remoteshare.nativeElement;
        _rshare.srcObject = null;
      }
    });
  
    // Of course, we'd also like to be able to leave the meeting:
    // document.getElementById('hangup').addEventListener('click', () => {
    //   meeting.leave();
    // });
  }
  
//   // Join the meeting and add media
async joinMeeting(meeting) {
    
  return meeting.join().then(() => {
    const mediaSettings = {
      receiveVideo: true,
      receiveAudio: true,
      receiveShare: false,
      sendVideo: this.sendVideo,
      sendAudio: this.sendAudio,
      sendShare: this.sendShare
    };

    // Get our local media stream and add it to the meeting
    return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
      const [localStream, localShare] = mediaStreams;

      meeting.addMedia({
        localShare,
        localStream,
        mediaSettings
      });
    });
  });
}
  
//   document.getElementById('destination').addEventListener('submit', (event) => {
//     // again, we don't want to reload when we try to join
//     event.preventDefault();
  
//     const destination = document.getElementById('invitee').value;
  
//     return webex.meetings.create(destination).then((meeting) => {
//       // Call our helper function for binding events to meetings
//       bindMeetingEvents(meeting);
  
//       return joinMeeting(meeting);
//     })
//     .catch((error) => {
//       // Report the error
//       console.error(error);
//     });
//   });
//     } 
audiocheckbox(e){
  if(e.target.checked){
    this.sendAudio=true
  }else{this.sendAudio=false}

}
videocheckbox(e){
  if(e.target.checked){
    this.sendVideo=true
  }else{this.sendVideo=false}
}  

async incoming_cancel(){
  this.incoming_call=false
  this.added_incoming.decline()
}
onLogout() {
  this.webexComponent.onLogout(event)
}

onvideoCall(){
  this.sendVideo=true
  this.sendAudio=true
  this.videoMute=true
  // this.onRegister()
  this.onDial()
}
onAudioCall(){
  this.sendVideo=false
  this.sendAudio=true
  this.onDial()
}
onShareScreen(){
  if (this.meet) {
    // First check if we can update
    this.waitForMediaReady(this.meet).then(() => {
      console.info('SHARE-SCREEN: Sharing screen via `shareScreen()`');
      this.meet.shareScreen()
        .then(() => {
          console.info('SHARE-SCREEN: Screen successfully added to meeting.');
        })
        .catch((e) => {
          console.error('SHARE-SCREEN: Unable to share screen, error:');
          console.error(e);
        });
    });
  }
  else {
    this.waitForMediaReady(this.added_incoming).then(() => {
      console.info('SHARE-SCREEN: Sharing screen via `shareScreen()`');
      this.added_incoming.shareScreen()
        .then(() => {
          console.info('SHARE-SCREEN: Screen successfully added to meeting.');
        })
        .catch((e) => {
          console.error('SHARE-SCREEN: Unable to share screen, error:');
          console.error(e);
        });
    });
  }
}

async waitForMediaReady(meeting) {
  return new Promise((resolve, reject) => {
    if (meeting.canUpdateMedia()) {
      resolve();
    }
    else {
      console.info('SHARE-SCREEN: Unable to update media, pausing to retry...');
      let retryAttempts = 0;

      const retryInterval = setInterval(() => {
        retryAttempts += 1;
        console.info('SHARE-SCREEN: Retry update media check');

        if (meeting.canUpdateMedia()) {
          console.info('SHARE-SCREEN: Able to update media, continuing');
          clearInterval(retryInterval);
          resolve();
        }
        // If we can't update our media after 15 seconds, something went wrong
        else if (retryAttempts > 15) {
          console.error('SHARE-SCREEN: Unable to share screen, media was not able to update.');
          clearInterval(retryInterval);
          reject();
        }
      }, 1000);
    }
  });
}
onStopScreen(){
  if (this.meet) {
    // First check if we can update, if not, wait and retry
    this.waitForMediaReady(this.meet).then(() => {
      this.meet.stopShare();
      this.localshare.nativeElement.srcObject = null
    });
  }
  else{
    this.waitForMediaReady(this.added_incoming).then(() => {
    this.added_incoming.stopShare();
    this.localshare.nativeElement.srcObject = null});}
}
onlist(){
this.list=!(this.list)
}
alert(){
  alert("alert")
}
audiocheck(){
  this.audioMute=true
  if (this.meet) {
    this.meet.muteAudio()
  }
}
audiocheckf(){
  this.audioMute=false
  if (this.meet) {
    this.meet.unmuteAudio()
  }
}
async videocheck(){
  this.videoMute=false
  if (this.meet) {
    this.meet.muteVideo()
  }
}
async videocheckf(){
  this.videoMute=true
  if (this.meet) {
    this.sendVideo=true
    this.meet.unmuteVideo()
  }
}
}
