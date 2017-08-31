import { Component, OnInit } from '@angular/core';
import { ExecService } from "../services/index";
import { ApplicationService } from "../services/index";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

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
    appData: any = {};
    groupedData: any = {};
    appByDateData:any[] = [
      {data: [], label: 'Application Status'}
    ];

  constructor(private execService: ExecService, private appService: ApplicationService) {}

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

}
