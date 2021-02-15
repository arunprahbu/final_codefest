import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebexComponent } from '../webex/webex.component'
import Webex from 'webex';

declare const bindMeetingEvents: any;
declare const joinMeeting: any;

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.sass'],
  
})
export class CallComponent implements OnInit {
  // @ViewChild("video") video: ElementRef;
  @ViewChild('video', { static: true }) private video: any;
  @ViewChild('audio', { static: true }) private audio: any;
  @ViewChild('remotevideo', { static: true }) private remotevideo: any;
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

  constructor(private webexComponent: WebexComponent) { 
    
    this.Token=localStorage.getItem('register_token')
    this.invitee=localStorage.getItem('invite')
    this.sendAudio = true
    this.sendVideo = true
  }

  ngOnInit(): void {
  
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
        access_token: localStorage.getItem('register_token')
      }
      
  })
  this.listenForIncoming()
  }
  async onRegister() {
    try {
      localStorage.setItem('register_token',this.Token)
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
    localStorage.setItem('invite',this.invitee)

    return this.webex.meetings.create(localStorage.getItem('invite')).then((meeting) => {
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
    if(this.meet != "undefined"){
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
    // alert(meeting)
    meeting.on('error', (err) => {
      console.error(err);
    });
  
    // Handle media streams changes to ready state
    meeting.on('media:ready', (media) => {
      // let _video=this.video.nativeElement;
      
      // // const _video = this.video.nativeElement
      // // alert(_video)
      //     //  alert(media)
      //      this.media=media
      if (!media) {
        return;
      }
      // const _video = this.video.nativeElement
      // alert(_video)
      if (media.type === 'local') {
        // alert("in local")
        const _video = this.video.nativeElement;
        _video.srcObject = media.stream;
          // _video.play();

        //                     _video.play();
        // alert("media is local")
        // _video.srcObject = media.stream;
      }
      if (media.type === 'remoteVideo') {
        const _rvideo = this.remotevideo.nativeElement;
        _rvideo.srcObject = media.stream;
      }
      if (media.type === 'remoteAudio') {
        const _audio = this.audio.nativeElement;
        _audio.srcObject = media.stream;
      }
    });
  
    // Handle media streams stopping
    meeting.on('media:stopped', (media) => {
      // Remove media streams
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
        sendShare: false
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
  
}
