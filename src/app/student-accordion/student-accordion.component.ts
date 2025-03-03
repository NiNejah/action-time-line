import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { student } from '../type';
import { AnalysisService } from '../services/analysis-service';

@Component({
  selector: 'app-student-accordion',
  templateUrl: './student-accordion.component.html',
  styleUrl: './student-accordion.component.scss'
})
export class StudentAccordionComponent implements OnInit, OnDestroy {
  students: student[] = [];
  private destroy$ = new Subject<void>();
  isLoading = false;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
    this.analysisService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    this.analysisService.students$
      .pipe(takeUntil(this.destroy$))
      .subscribe(students => {
        this.students = students;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}