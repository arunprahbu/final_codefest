import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallComponent } from "./call/call.component";
import { LoggedComponent } from "./logged/logged.component";
import { RoomComponent } from "./room/room.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { TeamsComponent } from "./teams/teams.component";
import { WebexComponent } from "./webex/webex.component";

const appRoutes: Routes = [
    { path: '', component: WebexComponent },
    // {canActivate: [AuthGuardService]},
    { path: 'logged', component: LoggedComponent, canActivate: [AuthGuardService] },
    { path: 'room', component: RoomComponent, canActivate: [AuthGuardService] },
    { path: 'call', component: CallComponent, canActivate: [AuthGuardService] },
    { path: 'teams', component: TeamsComponent, canActivate: [AuthGuardService] },
    { path: 'call/:email', component: CallComponent, canActivate: [AuthGuardService] }

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }