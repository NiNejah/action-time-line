import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import XRangeModule from 'highcharts/modules/xrange';
import ExportingModule from 'highcharts/modules/exporting';
import OfflineExportingModule from 'highcharts/modules/offline-exporting';

// Proper initialization of Highcharts modules
XRangeModule(Highcharts);
ExportingModule(Highcharts);
OfflineExportingModule(Highcharts);

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.scss'
})
export class StudentInfoComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() { 
    this.chartOptions = {
      chart: {
        type: 'xrange'
      },
      title: {
        text: 'Project Timeline'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Tasks'
        },
        categories: ['Design', 'Development', 'Testing', 'Deployment'],
        reversed: true
      },
      series: [{
        type: 'xrange',
        name: 'Project Phases',
        borderRadius: 5,
        pointWidth: 20,
        data: [{
          x: Date.UTC(2023, 0, 1),
          x2: Date.UTC(2023, 0, 15),
          y: 0
        }, {
          x: Date.UTC(2023, 0, 10),
          x2: Date.UTC(2023, 1, 1),
          y: 1
        }, {
          x: Date.UTC(2023, 0, 20),
          x2: Date.UTC(2023, 1, 15),
          y: 2
        }, {
          x: Date.UTC(2023, 1, 1),
          x2: Date.UTC(2023, 1, 20),
          y: 3
        }],
        dataLabels: {
          enabled: true,
          format: '{point.label}'
        }
      } as Highcharts.SeriesXrangeOptions]
    };
  }

  ngOnInit(): void {
  }
}
