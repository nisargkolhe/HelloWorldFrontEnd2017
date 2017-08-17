import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from "../user";
import { Application } from '../application';
import { UserService } from "../services/index";
import { ApplicationService } from "../services/index";
import { ExecService } from "../services/index";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  currentUser: User;
  applications: Application[] = [];
  stats: any = {};
  constructor(
    private userService: UserService,
    private appService: ApplicationService,
    private execService: ExecService,
    private route: ActivatedRoute,
    private router: Router) {
      this.currentUser = userService.loadFromLocalStorage();
    }

  ngOnInit() {
    this.appService.getAllApplications()
      .subscribe(
        result => {
          this.applications = result;
          console.log(result);
        }, error => {
          console.log(error);
        }
    );

    this.execService.getStats()
      .subscribe(
        result => {
          this.stats = result;
        }, error => {
          console.log(error);
        }
      )
  }

  onSelect(app: Application) {
    this.router.navigate(['/applications', app.id]);
  }

}
