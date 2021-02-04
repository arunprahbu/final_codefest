import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouteConfigLoadEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebexComponent } from '../webex/webex.component';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private WebexComponent: WebexComponent, private router: Router ) { }
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{

    // return !!this.WebexComponent.token
    
    if (this.WebexComponent.isLoggedIn){
      return true;
    }
    return this.router.createUrlTree(['']); 
  }
}
