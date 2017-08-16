import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../services/index';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  private buttonText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    if(this.userService.loadFromLocalStorage()){
      //User is logged in
      this.buttonText = "My Account";
    } else {
      this.buttonText = "Sign Up";
    }
  }

  public getButtonText(): string {
    return this.buttonText;
  }
}
