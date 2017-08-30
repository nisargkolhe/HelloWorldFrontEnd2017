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
    public barChartLabels:string[] = ['ToDo', 'Accepted', 'Waitlisted', 'Rejected'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
      {data: [], label: 'Application Status'}
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
          var groupedData = this.appData.reduce((accumulator, currentVal) => {
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
              this.appStats.rejected_internal], label: 'Application Status'}
          ];
        }, error => {
          console.log(error);
        }
      )
  }

}
