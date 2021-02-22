import { Component, OnInit } from '@angular/core'
import { WebexComponent } from '../webex/webex.component';
import {Router, RouterLink} from '@angular/router';
import {SharedService} from '../shared/shared.service'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {

  details:Promise<{}>|null = null;
  imageUrl:Promise<string>|null = null;
  displayName:Promise<string>|null = null
  rooms;;
  id;;
  email;;
  currentuserEmail;;
  count;;
  searchText: string;

  constructor(private webexComponent:WebexComponent, private router: Router, private shared:SharedService) { }
  async ngOnInit(): Promise<void>{
    // this.webex.onInit()
    // this.getPersonalDetails();
    
    this.webexComponent.onInit();
    await this.getRooms();
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
        this.currentuserEmail = details.emails
      }
    );
  }

  async getRooms() {
    this.rooms = await this.webexComponent.getRoomsWithDetails();
    console.log(this.rooms)
  }
  alert(id){
    this.id=id
  }
  sendid(){
    return this.id
  }
  tocall(id){
    alert(id)
    this.email(id)
    this.router.navigate(['/call'])
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );}

  async emails(room){
    this.count=0
    this.email = await this.webexComponent.getemailDetails(room.id);
    var e = this.email
    e.forEach((element,index)=>{
      this.count=this.count+1
      if(element==this.currentuserEmail) {delete e[index]};
   }); 
   if (this.count<3){
   var e1=JSON.stringify(e)
   this.shared.setMsg(e1.split('"')[1])
   localStorage.setItem('callee',e1.split('"')[1])

   this.router.navigate(['/call'])
   await this.delay(300);
   window.location.reload();
   }
   else{localStorage.setItem('callee',room.id)
   await this.delay(300);
   window.location.reload();}
   }
   
  }
  


