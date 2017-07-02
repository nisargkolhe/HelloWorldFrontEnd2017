import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, AuthenticationService } from '../services/index';
import { MdCardModule } from '@angular/material';


@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(
      private activatedRoute: ActivatedRoute,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) { }

  ngOnInit() {
      let token = this.route.snapshot.queryParams["token"];
      console.log('resetPasswordToken', token);
      if(token){
          this.model.token = token;
      } else {
          this.router.navigate(['/login']);
      }
  }

  confirmPassword(){
      this.loading = true;
      this.authenticationService.confirmPassword(this.model.password, this.model.token)
          .subscribe(
              data => {
                if(data.message == "success"){
                  this.alertService.success('Password Reset Successful', true);
                  this.router.navigate(['/login']);
                } else {
                  this.alertService.error(data.message);
                  this.loading = false;
                }
              },
              error => {
                  error = error.json()
                  this.alertService.error(error.message);
                  this.loading = false;
              });
  }

}
