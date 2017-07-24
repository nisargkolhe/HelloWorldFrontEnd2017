import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from "../user";
import { Application } from '../Application';
import { UserService } from "../services/index";
import { ApplicationService } from "../services/index";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  currentUser: User;
  applications: Application[] = [];

  constructor(
    private userService: UserService,
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
      this.router.navigate(['/']);
    }
  }

  onSelect(app: Application) {
    this.router.navigate(['/applications', app.id]);
  }

}
