import { Component, OnInit } from '@angular/core';
import { SelectRowDirective } from '@momentum-ui/angular/data-table/data-table-select-row.directive';
import { WebexComponent } from '../webex/webex.component'
declare const loop: any;
import { CallComponent } from '../call/call.component'
import { OrderModule } from 'ngx-order-pipe';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass']
})
export class RoomComponent implements OnInit {
  roomName: string;
  removeroomName: string;
  rooms: string;
  roomid: string;
  isShowRoom :boolean;
  hideSuccessMessage : boolean;
  display_list: boolean;
  display_create_room: boolean;
  display_remove: boolean;
  auth_gaurd: boolean;
  messages: any;
  messageRoom: any;
  receivedmsg: any;
  incoming_message: boolean;
  hideRemoveMessage: boolean;
  constructor(private webexComponent: WebexComponent) {this.isShowRoom=false,
    this.hideSuccessMessage=true,this.hideRemoveMessage=true, this.display_list=false, this.display_create_room=true, this.display_remove=false,this.auth_gaurd = true,this.receivedmsg="No Messages Received"}

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
    this.display_remove=false
  }
  ondisplay_create_room(){
    this.display_create_room=true
    this.display_list=false
    this.display_remove=false
  }
  ondisplay_remove(){
    this.display_create_room=false
    this.display_list=false
    this.display_remove=true
   }
  onLogout() {
    this.webexComponent.onLogout(event)
  }

  FadeOutSuccessMsg() {
    setTimeout( () => {
        this.hideSuccessMessage = true;
        this.hideRemoveMessage=true;
     }, 4000);
 }

 clearlist(){
  this.isShowRoom=false
 }
 
 onRemoveRoom(){
    this.webexComponent.onListRoom().then((rooms) => {
      this.rooms = rooms;
      for (var i = 0; i < rooms.items.length; i+= 1) {
        var found = false;
        if (rooms.items[i].title === this.removeroomName){
          this.webexComponent.onremove(rooms.items[i].id)
          found = true;
          if (found === true){
            this.hideRemoveMessage=false

          }
          break;
        }
      }
      if(!found){
        alert(this.removeroomName + "does not exist")
      }

    })
}
onSendMsg(){

  this.webexComponent.onListRoom().then((rooms) => {
    let newarr = rooms.sort((a, b) => b.lastActivity - a.lastActivity);
    this.rooms=newarr
    for (var i = 0; i < rooms.items.length; i+= 1) {
      var found = false;
      if (rooms.items[i].title === this.messageRoom){
        this.webexComponent.onSendMsg(rooms.items[i].id, this.messages)
        found = true;
        break;
      }
    }
    if(!found){
      alert(this.removeroomName + "does not exist")
    }

  })
  
}
async onReceiveMsg(){

  this.webexComponent.onRecvMsg()
}
async message(){
  this.receivedmsg=this.webexComponent.ret()

}
key:string="lastActivity";
reverse:boolean=false;
sort(key){
  this.key=key
  this.reverse=!this.reverse 


}
}