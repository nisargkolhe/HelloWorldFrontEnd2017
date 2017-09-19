import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, UserService, ApplicationService } from '../services/index';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public isLoggedIn: boolean;
  public show: boolean;
  public appMode: string;
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private appService: ApplicationService,
    private alertService: AlertService) { }

  ngOnInit() {
    if(this.userService.loadFromLocalStorage()){
      //User is logged in
      this.isLoggedIn = true;
    } else {
      //User is not logged in
      this.isLoggedIn = false;
    }

    this.appService.getApplicationMode()
      .subscribe(
        result => {
          console.log(result);
          this.appMode = result.status;
        }, error => {
        }
    );
  }

  public interestSignup() {
    var email = this.model.interestText;

    //Validate email
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(this.model.interestText) || this.model.interestText.length <= 0) {
      //Email is not valid
      this.model.warningMessage = "Please enter a valid email";
      return;
    }
    this.userService.sendInterestSignup(this.model.interestText)
      .subscribe(
        result => {
          this.model.interestText = "";
          this.model.warningMessage = "Thanks! We'll be in touch soon!";
        }, error => {
          this.model.warningMessage = "Sorry, something went wrong";
        }
    );

  }
}
