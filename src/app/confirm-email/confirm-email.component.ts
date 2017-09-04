import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../services/index';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  model: any = {};
  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }
    public manual: boolean = false;
  ngOnInit() {
    let token = this.route.snapshot.queryParams["token"];
    console.log('confirmEmailToken', token);
    if(token){
      if(token !== "manual_verify") {
        this.model.token = token;
        this.confirmEmail();
      } else {
        this.manual = true;
      }

    } else {
        this.alertService.error("Please email us at helloworld@purduehackers.com");
        this.router.navigate(['/login']);
    }
  }

  confirmEmail(){
      this.loading = true;
      this.authenticationService.confirmEmail(this.model.token)
          .subscribe(
              data => {
                if(data.message == "success"){
                  this.alertService.success('Email Verification Successful', true);
                  this.router.navigate(['/login']);
                } else {
                  this.alertService.error(data.message);
                  this.loading = false;
                }
              },
              error => {
                  error = error.json();
                  this.alertService.error(error.error);
                  this.loading = false;
              });
  }

  manualVerify() {
    //Use manual token instead
    this.authenticationService.confirmEmail(this.model.manualtoken)
        .subscribe(
            data => {
              if(data.message == "success"){
                this.alertService.success('Email Verification Successful', true);
                this.router.navigate(['/login']);
              } else if (data.message == "invalid_token"){
                this.alertService.error("Wrong Token");
                this.loading = false;
              } else {
                this.alertService.error(data.message);
                this.loading = false;
              }
            },
            error => {
                error = error.json();
                this.alertService.error("Invalid token");
                this.loading = false;
            });
  }
}
