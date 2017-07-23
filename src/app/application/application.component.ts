import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdCardModule, MdRadioModule, MdInputModule, MdSelectModule } from '@angular/material';

import { User } from '../user';
import { Application } from '../application';

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
  appSubmitted = false;

  filename = null;

  class_years = [
    {value: 'freshman', viewValue: 'Freshman'},
    {value: 'sophomore', viewValue: 'Sophomore'},
    {value: 'junior', viewValue: 'Junior'},
    {value: 'senior', viewValue: 'Senior'}
  ];

  grad_years = ["2017","2018","2019","2020","2021","2022","2023","2024","2025"];

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
    this.loadApplication();
  }

  setFile(event){
    console.log('upload', event.srcElement.files);
    this.model.resume = event.srcElement.files[0];
    this.filename = event.srcElement.files[0].name;
  }

  apply() {
      this.loading = true;
      if(!this.appSubmitted){
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
      } else {
        this.userService.updateApplication(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Application successfully updated.', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
      }

  }

  private loadApplication() {
      this.userService.getApplication()
        .subscribe(
          result => {
            this.model = result.application;
            if(result.message === "success")
              this.appSubmitted = true;
            console.log(result);
          }, error => {
            console.log(error);
          }
      );
  }
}
