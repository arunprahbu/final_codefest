import { Component, OnInit } from '@angular/core';
import { WebexComponent } from '../webex/webex.component'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.sass']
})
export class TeamsComponent implements OnInit {
  teamName: string;
  addUserId: string;
  teams: string;
  teamid: string;
  updateTeamName: string;
  isShowRoom :boolean;
  hideSuccessMessage : boolean;
  display_list: boolean;
  display_create_team: boolean;
  display_remove: boolean;
  auth_gaurd: boolean;
  constructor(private webexComponent: WebexComponent) {this.isShowRoom=false,
    this.hideSuccessMessage=true, this.display_list=false, this.display_create_team=true, this.display_remove=false,this.auth_gaurd = true}


  ngOnInit(): void {
    this.webexComponent.onInit()
  }
  onCreateTeam() {
    if(this.teamName) {
      this.webexComponent.onCreateTeam(this.teamName)
      this.hideSuccessMessage=false
    }
  }
  listTeams() {
    this.webexComponent.onListTeam().then((teams) => {
      console.log(teams)
      this.teams = teams;
      this.isShowRoom = true;
    })
  }
  ondisplay_list(){ 
    this.display_list=true
    this.display_create_team=false
    this.display_remove=false
  }
  ondisplay_create_team(){
    this.display_create_team=true
    this.display_list=false
    this.display_remove=false
  }
  ondisplay_remove(){
    this.display_create_team=false
    this.display_list=false
    this.display_remove=true
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
 
 onUpdateTeamMemeber(){
    this.webexComponent.onListTeam().then((teams) => {
      this.teams = teams;
      // console.log(rooms)
      // loop(this.rooms)
      for (var i = 0; i < teams.items.length; i+= 1) {
        var found = false;
        if (teams.items[i].name === this.updateTeamName){
          alert(teams.items[i].name)
          this.webexComponent.onUpdateTeamMember(this.addUserId, teams.items[i].id)
          found = true;
          break;
        }
      }
      if(!found){
        alert(this.updateTeamName + "does not exist")
      }

    })
}
onRemoveTeamMemeber(){
  this.webexComponent.onListTeam().then((teams) => {
    this.teams = teams;
    // console.log(rooms)
    // loop(this.rooms)
    for (var i = 0; i < teams.items.length; i+= 1) {
      var found = false;
      if (teams.items[i].name === this.updateTeamName){
        alert(teams.items[i].name)
        this.webexComponent.onRemoveTeamMember(teams.items[i].id)
        found = true;
        break;
      }
    }
    if(!found){
      alert(this.updateTeamName + "does not exist")
    }

  })
}

 }


