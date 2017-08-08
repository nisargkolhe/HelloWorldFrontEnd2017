import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from "../user";
import { Application } from '../application';

import { AlertService, UserService, ApplicationService, ExecService } from "../services/index";

@Component({
  selector: 'app-judge-application',
  templateUrl: './judge-application.component.html',
  styleUrls: ['./judge-application.component.css']
})
export class JudgeApplicationComponent implements OnInit {

  loading = true;
  application: Application;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private appService: ApplicationService,
    private execService: ExecService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadApplication();
  }

  public setStatus(status){
    this.loading = true;
    this.appService.setStatus(this.application.id, status)
        .subscribe(
            data => {
                this.alertService.success('Application successfully updated.', true);
                //this.loading = false;
                //this.loadApplication();
                this.execService.getNextApplication()
                  .subscribe(
                    result => {
                      console.log(result);
                      if(result){
                        this.router.navigate(['/application/'+result.id]);
                      }
                    }, error => {
                      console.log(error);
                      this.router.navigate(['/applications']);
                      this.loading = false;
                    }
                );
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

  private loadApplication(){
    this.route.paramMap.switchMap((params: ParamMap) =>
        this.appService.getApplication(params.get('id')))
      .subscribe((application: Application) => {
        this.application = application;
        this.loading = false
        console.log(application);
      });
  }

}
