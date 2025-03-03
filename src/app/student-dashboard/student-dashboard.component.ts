import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DisplaySettings, student } from '../type';
import { AnalysisService } from '../services/analysis-service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent implements OnInit, OnDestroy {
  @Input() student!: student;
  settings: DisplaySettings | null = null;
  private destroy$ = new Subject<void>();

  constructor(private analysisService: AnalysisService) {}

  ngOnInit() {
    this.analysisService.settings$
      .pipe(takeUntil(this.destroy$))
      .subscribe(settings => {
        this.settings = settings;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}