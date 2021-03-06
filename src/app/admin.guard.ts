import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from "./services/index";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let currentUser = this.userService.loadFromLocalStorage();
      if(currentUser.roles.indexOf('admin') !== -1){
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
  }
}
