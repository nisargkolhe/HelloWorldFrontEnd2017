import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from "../user";
import { Application } from '../Application';

import { ApplicationService } from "../services/index";

@Component({
  selector: 'app-judge-application',
  templateUrl: './judge-application.component.html',
  styleUrls: ['./judge-application.component.css']
})
export class JudgeApplicationComponent implements OnInit {
  application: Application;

  constructor(
    private appService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
        this.appService.getApplication(params.get('id')))
      .subscribe((application: Application) => {
        this.application = application;
        console.log(application);
      });
  }

}
