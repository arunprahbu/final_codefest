import { Component, OnInit } from '@angular/core';
import { WebexComponent } from '../webex/webex.component'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass']
})
export class RoomComponent implements OnInit {
  roomName: string;
  rooms: string;
  isShowRoom :boolean;
  hideSuccessMessage : boolean;
  display_list: boolean;
  display_create_room: boolean;
  auth_gaurd: boolean;
  constructor(private webexComponent: WebexComponent) {this.isShowRoom=false,
    this.hideSuccessMessage=true, this.display_list=false, this.display_create_room=true, this.auth_gaurd = true}

  ngOnInit(): void {
    this.webexComponent.onInit()
  }
  onCreateRoom() {
    if(this.roomName) {
      this.webexComponent.onCreateRoom(this.roomName)
      this.hideSuccessMessage=false
    }
  }
  listRooms() {
    this.webexComponent.onListRoom().then((rooms) => {
      console.log(rooms)
      this.rooms = rooms;
      this.isShowRoom = true;
    })
  }
  ondisplay_list(){ 
    this.display_list=true
    this.display_create_room=false
  }
  ondisplay_create_room(){
    this.display_create_room=true
    this.display_list=false
  }
  onLogout() {
    this.webexComponent.onLogout(event)
  }

  FadeOutSuccessMsg() {
    setTimeout( () => {
        this.hideSuccessMessage = true;
     }, 4000);
 }

 clearlist(){
  this.isShowRoom=false
 }
}
