import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { COLOR, LegendItem, student } from '../type';
import { LegendService } from '../services/legend.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-student-pie-charts',
  templateUrl: './student-pie-charts.component.html',
  styleUrls: ['./student-pie-charts.component.scss']
})
export class StudentPieChartsComponent implements OnInit, OnDestroy {
  @Input() student!: student;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsBefore: Highcharts.Options;
  chartOptionsAfter: Highcharts.Options;
  legendItems!: LegendItem[];
  private destroy$ = new Subject<void>();

  constructor(private legendService: LegendService) {
    this.chartOptionsBefore = this.getPieChartOptions('Sans Actions');
    this.chartOptionsAfter = this.getPieChartOptions('Avec Actions');
  }

  ngOnInit(): void {
    this.legendService.legendItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.legendItems = items;
        this.updateCharts();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {
    this.updateCharts();
  }

  private updateCharts() {
    this.chartOptionsBefore = {
      ...this.chartOptionsBefore,
      series: [{
        type: 'pie',
        data: this.aggregateData(this.student?.sansAction || [])
      }]
    };

    this.chartOptionsAfter = {
      ...this.chartOptionsAfter,
      series: [{
        type: 'pie',
        data: this.aggregateData(this.student?.avecAction || [])
      }]
    };
  }

  private aggregateData(actions: any[]): Highcharts.PointOptionsObject[] {
    const aggregated = actions.reduce((acc, action) => {
      acc[action.etiquette] = (acc[action.etiquette] || 0) + action.durationInSecond;
      return acc;
    }, {});

    return Object.entries(aggregated).map(([name, y]) => ({
      name,
      y: y as number,
      color: this.getColor(name)
    }));
  }

  private getPieChartOptions(title: string): Highcharts.Options {
    return {
      chart: { type: 'pie' },
      title: { text: title },
      tooltip: {
        formatter: function () {
          const totalSeconds = this.y || 0;
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = Math.floor(totalSeconds % 60);
          return `
            <b>${this.point.name}</b><br>
            Duration: ${hours}h ${minutes}m ${seconds}s<br>
            Percentage: ${this.percentage?.toFixed(1)}%
          `;
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%'
          }
        }
      }
    };
  }

  getColor(etiquette: string): string {
    return this.legendItems?.find(item => item.key === etiquette)?.color || '#CCCCCC';
  }
}