import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../services/index';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public isLoggedIn: boolean;
  public show: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    if(this.userService.loadFromLocalStorage()){
      //User is logged in
      this.isLoggedIn = true;
    } else {
      //User is not logged in
      this.isLoggedIn = false;
    }
  }
}
