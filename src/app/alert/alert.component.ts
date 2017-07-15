import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/index';

import { MdSnackBar } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;

  constructor(
    private alertService: AlertService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
      this.alertService.getMessage().subscribe(message => {
        if(message)
          this.snackBar.open(message.text);
        //this.message = message;
      });
  }

}
