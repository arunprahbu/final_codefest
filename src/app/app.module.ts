import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { WebexComponent } from './webex/webex.component';
import { LoggedComponent } from './logged/logged.component';
import { AccordionModule, AlertBannerModule, AlertModule, ButtonModule, CheckboxModule, InputModule, LoadingModule, SideBarBodyModule, SidebarFooterModule, SidebarHeaderModule, SideBarModule, SidebarNavItemModule, SidebarNavModule } from '@momentum-ui/angular';
import { RoomComponent } from './room/room.component';
import { CallComponent } from './call/call.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TeamsComponent } from './teams/teams.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AccountSideBarComponent } from './account-side-bar/account-side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    WebexComponent,
    LoggedComponent,
    RoomComponent,
    CallComponent,
    TeamsComponent,
    SideBarComponent,
    AccountSideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AccordionModule,
    ButtonModule,
    InputModule,
    LoadingModule,
    SideBarModule,
    SideBarBodyModule,
    SidebarNavModule,
    SidebarNavItemModule,
    SidebarHeaderModule,
    SidebarFooterModule,
    AlertModule,
    AlertBannerModule,
    CheckboxModule,
    Ng2SearchPipeModule
  ],
  providers: [WebexComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
