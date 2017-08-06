import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule, FormControl } from '@angular/forms';

import { ExecService, AlertService, UserService } from "../services/index";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  emailCtrl: FormControl;
  filteredUsers: any;
  _filteredUsers: any;

  checkins: any = [];
  model: any = {};

  loading = false;
  loadingSearch = false;

  constructor(
    private execService: ExecService,
    private alertService: AlertService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.emailCtrl = new FormControl();
    this.filteredUsers = this.emailCtrl.valueChanges
      .debounceTime(400)
      .subscribe(searchKey => {
        console.log('searchKey', searchKey);
        if(!searchKey)
          return this._filteredUsers = [];

        this.loadingSearch = true;
        this.userService.userSearch(searchKey).subscribe((res) => {
          this.loadingSearch = false;
          return this._filteredUsers = res.users;
        });

      });
  }

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

  loadFilteredUsers(searchKey: string) {
    this.userService.userSearch(searchKey)
      .subscribe(
        result => {
          this._filteredUsers = result;
          console.log(result);
        }, error => {
          this.alertService.error(error);
          console.log(error);
        }
    );
  }

  filterUsers(searchKey: string) {
    return searchKey ? this._filteredUsers.filter(user => user.email.toLowerCase().indexOf(searchKey.toLowerCase()) === 0)
      : this._filteredUsers;
  }

}
