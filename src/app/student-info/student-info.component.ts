import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import XRangeModule from 'highcharts/modules/xrange';
import ExportingModule from 'highcharts/modules/exporting';
import OfflineExportingModule from 'highcharts/modules/offline-exporting';

import { action, COLOR, student } from '../type';

// Proper initialization of Highcharts modules
XRangeModule(Highcharts);
ExportingModule(Highcharts);
OfflineExportingModule(Highcharts);

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.scss'
})
export class StudentInfoComponent implements OnInit {
  @Input() student!: student;
  
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions!: Highcharts.Options;

  // Base timestamp for the timeline (January 1, 2023 UTC)
  private baseTimestamp = Date.UTC(2023, 0, 1);

  constructor() { 
  }

  ngOnInit(): void {
    this.updateChart();
  }

  private updateChart(): void {
    if (!this.student) return;

    this.chartOptions = {
      tooltip: {
        formatter: function() {
          const point = this.point as any;
          const durationSeconds = (point.x2 - point.x) / 1000;
          const minutes = Math.floor(durationSeconds / 60);
          const seconds = Math.floor(durationSeconds % 60);
          let durationText = [ minutes, seconds]
              .map(v => v.toString().padStart(2, '0'))
              .join(':');
          return `Action: <b>${point.name}</b><br/>Duration: <b>${durationText}</b>`;
        }
      },

      chart: { 
        type: 'xrange',
        zooming: {
          type: 'x',
          singleTouch: true,
          resetButton: {
            theme: {
              display: 'none'
            }
          }
        }
      },
      title: { text: '' },
      xAxis: { type: 'datetime' },
      yAxis: {
        title: { text: '' }, 
        categories: ['Sans', 'Avec'],
        reversed: true
      },
      series: this.generateXrangeSeries(),
      legend: {
        enabled: false
      }
    };
  }


  private generateXrangeSeries(): Highcharts.SeriesXrangeOptions[] {
    return [{
      type: 'xrange',
      pointWidth: 40,
      borderRadius: 0,
      borderWidth: 0,
      data: [
        ...this.processActions(this.student?.sansAction, 0),
        ...this.processActions(this.student?.avecAction, 1)
        
      ]
    }];
  }

  private processActions(actions: action[], y: number): Highcharts.XrangePointOptionsObject[] {
    let currentTime = this.baseTimestamp;
    return actions.map(action => {
      const start = currentTime;
      const end = start + action.durationInSecond * 1000;
      currentTime = end;
      
      return {
        name: action.etiquette,
        x: start,
        x2: end,
        y: y,
        color: this.getColor(action.etiquette),
        dataLabels: {
          enabled: true,
          format: '',
          style: {
            color: '#fff',
            textOutline: 'none'
          }
        }
      };
    });
  }

  private getColor(etiquette: string): string {
    return COLOR[etiquette] || '#CCCCCC';
  }
}
