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
  filteredApplications: Application[] = [];
  stats: any = {};

  model: any = {};

  class_years = [
    {value: 'all', viewValue: 'All'},
    {value: 'freshman', viewValue: 'Freshman'},
    {value: 'sophomore', viewValue: 'Sophomore'},
    {value: 'junior', viewValue: 'Junior'},
    {value: 'senior', viewValue: 'Senior'}
  ];

  statuses = [
    {value: 'all', viewValue: 'All'},
    {value: 'pending', viewValue: 'Pending'},
    {value: 'accepted', viewValue: 'Accepted'},
    {value: 'waitlisted', viewValue: 'Waitlisted'},
    {value: 'rejected', viewValue: 'Rejected'},
  ];

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
          this.filteredApplications = result;
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
      );

    this.model.yearFilter = 'all';
    this.model.statusFilter = 'all';
  }

  filter(){
    let that = this;

    this.filteredApplications = this.applications.filter(function (app) {
      //Check if there's yearFilter and/or statusFilter and continue if it matches the filter
      console.log("that.model.yearFilter", that.model.yearFilter);
      console.log("that.model.statusFilter", that.model.statusFilter);

      if((that.model.yearFilter == 'all' || (that.model.yearFilter && app.class_year == that.model.yearFilter)) && (that.model.statusFilter == 'all' || (that.model.statusFilter && app.status_internal == that.model.statusFilter))) {
        if(!that.model.nameFilter || !app.user.email) //Check if there's nameFilter, return true if not
          return true;
        else
          return (app.user.email.toLowerCase().includes(that.model.nameFilter.toLowerCase()) || app.user.firstname.toLowerCase().includes(that.model.nameFilter.toLowerCase()) || app.user.lastname.toLowerCase().includes(that.model.nameFilter.toLowerCase()));
      }
      return false;
    });
  }

  onSelect(app: Application) {
    this.router.navigate(['/applications', app.id]);
  }

}
