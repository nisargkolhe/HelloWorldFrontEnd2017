import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from "../user";
import { Application } from '../Application';
import { UserService } from "../services/index";
import { ApplicationService } from "../services/index";


@Component({
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  applications: Application[] = [];

  constructor(
    private userService: UserService,
    private appService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
    }
  }

  onSelect(app: Application) {
    this.router.navigate(['/applications', app.id]);
  }
}
