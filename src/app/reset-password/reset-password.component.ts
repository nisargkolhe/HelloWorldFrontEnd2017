import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../services/index';
import { MdCardModule } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) { }

  ngOnInit() {
  }

  resetPassword(){
      this.loading = true;
      this.authenticationService.resetPassword(this.model.email)
          .subscribe(
              data => {
                  if(data.message == "success"){
                      this.alertService.success('Please check your email for password reset link.', true);
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
