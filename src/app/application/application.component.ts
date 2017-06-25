import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdCardModule, MdRadioModule, MdInputModule, MdSelectModule } from '@angular/material';

import { User } from '../user';
import { AlertService, UserService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  currentUser: User;

  model: any = {};
  loading = false;

  class_years = [
    {value: 'freshman', viewValue: 'Freshman'},
    {value: 'sophomore', viewValue: 'Sophomore'},
    {value: 'junior', viewValue: 'Junior'},
    {value: 'senior', viewValue: 'Senior'}
  ];

  referrals = [
    {value: 'social_media', viewValue: 'Social Media'},
    {value: 'website', viewValue: 'Purdue Hackers Website'},
    {value: 'flyers', viewValue: 'Flyers'},
    {value: 'class', viewValue: 'Class Callout'},
    {value: 'friend', viewValue: 'Friend'}
  ];

  shirt_sizes = [
    {value: 's', viewValue: 'S'},
    {value: 'm', viewValue: 'M'},
    {value: 'l', viewValue: 'L'},
    {value: 'xl', viewValue: 'XL'},
    {value: 'xxl', viewValue: 'XXL'}
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  apply() {
      this.loading = true;
      this.userService.apply(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Application successfully submitted.', true);
                  this.router.navigate(['/']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
