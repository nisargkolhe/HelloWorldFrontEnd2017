import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

  register() {
      this.loading = true;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  error = error.json();
                  console.log('error obj', error);
                  let errorMsg = "";
                  for(var attr in error.errors){
                    //errorMsg += attr + ":\n"
                    error.errors[attr].forEach(error => errorMsg += error + "\n");
                  }
                  console.log('errorMsg', errorMsg);
                  this.alertService.error(errorMsg);
                  this.loading = false;
              });
  }

}
