import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from "../user";
import { Application } from '../application';
import { UserService } from "../services/index";
import { AuthenticationService, AlertService, ApplicationService } from "../services/index";


@Component({
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  applications: Application[] = [];
  application: Application;
  appSubmitted = false;
  loading = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private appService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.currentUser = userService.loadFromLocalStorage();
  }

  ngOnInit() {
    if(this.currentUser.roles.indexOf('admin') !== -1){
      this.appService.getAllApplications()
        .subscribe(
          result => {
            this.applications = result;
            console.log(result);
          }, error => {
            console.log(error);
          }
      );
    } else {
      this.loadApplication();
    }
  }

  onSelect(app: Application) {
    this.router.navigate(['/applications', app.id]);
  }

  private loadApplication() {
      this.userService.getApplication()
        .subscribe(
          result => {
            this.application = result.application;
            if(result.message === "success")
              this.appSubmitted = true;
            console.log(result);
            this.loading = false;
          }, error => {
            console.log(error);
            this.loading = false;
          }
      );
  }

  private resendVerificationEmail() {
      this.loading = true;
      this.authService.resendVerificationEmail()
        .subscribe(
          result => {
            this.alertService.success(result.message);
            console.log(result);
            this.loading = false;
          }, error => {
            this.alertService.error(error.message);
            this.loading = false;
          }
      );
  }
}
