import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { WebexComponent } from './webex/webex.component';
import { LoggedComponent } from './logged/logged.component';
import { ButtonModule } from '@momentum-ui/angular';
import { RoomComponent } from './room/room.component';
import { CallComponent } from './call/call.component';
import { AuthGuardService } from './services/auth-guard.service';


const appRoutes: Routes = [
  {path: '', component: WebexComponent},
  // {canActivate: [AuthGuardService]},
  {path: 'logged', component: LoggedComponent,canActivate: [AuthGuardService]},
  {path: 'room', component: RoomComponent,canActivate: [AuthGuardService]},
  {path: 'call',component: CallComponent,canActivate: [AuthGuardService]},

]
@NgModule({
  declarations: [
    AppComponent,
    WebexComponent,
    LoggedComponent,
    RoomComponent,
    CallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ButtonModule
  ],
  providers: [WebexComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
