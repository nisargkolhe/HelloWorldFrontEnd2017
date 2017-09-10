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

  resume_options = [
    {value: 'all', viewValue: 'Either'},
    {value: 'yes', viewValue: 'Has Resume'},
    {value: 'no', viewValue: 'No Resume'},
  ]

  sort_options = [
    {value: 'timestamp', viewValue: 'Time of Application'},
    {value: 'hackathon_count', viewValue: 'Hackathon Count'},
    {value: 'grad_year', viewValue: 'Graduation Year'},
  ]

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
          //console.log(result);
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
    this.model.resumeFilter = 'all';
    this.model.sort_mode = "timestamp";
  }

  filter(){
    let that = this;

    this.filteredApplications = this.applications.filter(function (app) {
      //Check if there's yearFilter and/or statusFilter and continue if it matches the filter
      if((that.model.yearFilter == 'all' || (that.model.yearFilter && app.class_year == that.model.yearFilter))
        && (that.model.statusFilter == 'all' || (that.model.statusFilter && app.status_internal == that.model.statusFilter))
        && (that.model.resumeFilter == 'all' || (that.model.resumeFilter
          && (app.resume === null && that.model.resumeFilter == "no") || (app.resume !== null && that.model.resumeFilter == "yes")))) {
        //Check if there's a text filter in place, return true if not
        if((!that.model.nameFilter || !app.user.email) && (!that.model.majorFilter || !app.major)) {
        return true;
        } else {
          return (
              (!that.model.nameFilter
              || app.user.email.toLowerCase().includes(that.model.nameFilter.toLowerCase())
              || app.user.firstname.toLowerCase().includes(that.model.nameFilter.toLowerCase())
              || app.user.lastname.toLowerCase().includes(that.model.nameFilter.toLowerCase()))
              && ( !that.model.majorFilter || app.major.toLowerCase().includes(that.model.majorFilter.toLowerCase())));
        }
      }
      return false;
    }).sort(function(a, b) {
      if(that.model.sort_mode === "hackathon_count") {
        return a.hackathon_count - b.hackathon_count;
      } else if(that.model.sort_mode === "grad_year") {
        var aInt = parseInt(a.grad_year);
        var bInt = parseInt(b.grad_year);
        if(aInt > bInt)
          return 1;
        else if (aInt < bInt)
          return -1;
        else
          return 0;
      } else {
        if(a.created_at > b.created_at)
          return 1;
        else if (a.created_at < b.created_at)
          return -1;
        else
        return 0;
      }
    });
  }

  onSelect(app: Application) {
    this.router.navigate(['/applications', app.id]);
  }

}
