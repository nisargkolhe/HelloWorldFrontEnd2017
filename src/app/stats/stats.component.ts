import { Component, OnInit } from '@angular/core';
import { ExecService } from "../services/index";
import { ApplicationService } from "../services/index";
import { User } from "../user";
import { UserService } from "../services/index";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  currentUser: User;

  model: any = {};
  adminsList: any = [];

  site_mode_options = [
    {value: 'interest', viewValue: 'Interest Signups'},
    {value: 'open', viewValue: 'Applications Open'},
    {value: 'closed', viewValue: 'Applications Closed'},
    {value: 'dayof', viewValue: 'Day-Of'},
  ];

  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    public appByDateLabels:string[] = [];
    public barChartLabels:string[] = ['Pending', 'Accepted', 'Waitlisted', 'Rejected'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
    {data: [], label: 'Internal Status'},
    {data: [], label: 'Public Status'}
    ];

    appStats: any = {};
    checkinMode: any = {};
    appMode: any = "??";
    appData: any = {};
    groupedData: any = {};
    appByDateData:any[] = [
      {data: [], label: 'Application Status'}
    ];

  constructor(private execService: ExecService,
    private appService: ApplicationService,
    private userService: UserService) {
    this.currentUser = userService.loadFromLocalStorage();
  }

  ngOnInit() {
    this.appService.getAllApplications()
      .subscribe(
        result => {
          this.appData = result;
          //Reduce into stats
          var groupedData = this.reduceToDates(this.appData);
          this.groupedData = groupedData;
          this.appByDateData = [
            {data: [], label: 'Applications by Day'}
          ];
          this.appByDateLabels.length = 0;

          for(var k in groupedData) {
            //Format date in human-friendly way
            this.appByDateLabels.push(""+k);
            this.appByDateData[0].data.push(groupedData[k].length);
          }
        }, error => {
          console.log(error);
        }
    );

    this.execService.getStats()
      .subscribe(
        result => {
          this.appStats = result;
          this.barChartData = [
            {data: [this.appStats.pending_internal,
              this.appStats.accepted_internal,
              this.appStats.waitlisted_internal,
              this.appStats.rejected_internal], label: 'Internal'},
              {data: [this.appStats.pending_public,
                this.appStats.accepted_public,
                this.appStats.waitlisted_public,
                this.appStats.rejected_public], label: 'Published'}
          ];
        }, error => {
          console.log(error);
        }
      )

      this.execService.getCheckinMode()
      .subscribe(
        result => {
          this.checkinMode = result.mode;
        }, error => {
          console.log(error);
        }
      )

      //Only check these if user has devteam role
      if(this.currentUser.roles.indexOf('devteam') !== -1) {
        this.execService.getAdminList()
        .subscribe(
          result => {
            this.adminsList = result.admins;
          }, error => {
            console.log(error);
          }
        )

        this.appService.getApplicationMode()
          .subscribe(
            result => {
              console.log(result.status);
              this.model.appMode = result.status;
              this.appMode = result.status;
            }, error => {
            }
        );
      }

  }


    private reduceToDates(inputData) {
      var r = inputData.reduce((accumulator, currentVal) => {
        var dateString = currentVal.created_at.split(' ')[0];
        if(accumulator == null) {
          accumulator = {};
        }
        if(!accumulator[dateString]) {
          accumulator[dateString] = [];
        }
        accumulator[dateString].push(currentVal);
        return accumulator;
      },{});
      return r;
    }

    public getFriendlyModeName() {
      switch(this.checkinMode) {
        case "accepted_only":
          return "Accepted Users Only";
        case "waitlisted_okay":
          return "Accepted or Waitlisted Users";
        default:
          return "??";
      }
    }

    public toggleMode() {
      var newMode = (this.checkinMode === "accepted_only") ? "waitlisted_okay" : "accepted_only";

      this.execService.setCheckinMode(newMode)
      .subscribe(
        result => {
          this.checkinMode = result.mode;
        }, error => {
          console.log(error);
        }
      )
    }

    public confirmSiteMode() {
      this.execService.setApplicationMode(this.model.appMode)
      .subscribe(
        result => {
          this.appMode = result.mode;
        }, error => {
          console.log(error);
        }
      )
    }

    public addAdminPermission() {
      var emailToAdd = this.model.promoteText;

      this.execService.addAdmin(emailToAdd)
      .subscribe(
        result => {
          this.adminsList = result.admins;
        }, error => {
          console.log(error);
          alert("Unable to add admin");
        }
      )
    }

    public revokePermission(emailToRevoke) {
      this.execService.revokeAdmin(emailToRevoke)
      .subscribe(
        result => {
          this.adminsList = result.admins;
        }, error => {
          console.log(error);
          alert("Unable to add user with given email")
        }
      )
    }

}
