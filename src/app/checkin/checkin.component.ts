import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ExecService, AlertService } from "../services/index";


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  checkins: any = [];
  model: any = {};

  loading = false;

  constructor(
    private execService: ExecService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCheckIns();
  }

  loadCheckIns(){
    this.execService.getAllCheckins()
      .subscribe(
        result => {
          this.checkins = result;
          console.log(result);
        }, error => {
          this.alertService.error(error);
          console.log(error);
        }
    );
  }

  checkInUser() {
      this.loading = true;
      this.execService.checkInUser(this.model.userEmail)
          .subscribe(
              data => {
                  this.alertService.success(data.message);
                  this.loadCheckIns();
                  this.loading = false;
              },
              error => {
                  this.alertService.error(error);
                  console.log(error);
                  this.loading = false;
              });


  }

}
