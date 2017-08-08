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

  ngOnInit() {
    let token = this.route.snapshot.queryParams["token"];
    console.log('confirmEmailToken', token);
    if(token){
        this.model.token = token;
        this.confirmEmail();
    } else {
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
}
