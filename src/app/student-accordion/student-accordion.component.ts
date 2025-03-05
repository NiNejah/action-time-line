import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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

  constructor(
    private analysisService: AnalysisService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.analysisService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    const savedOrder = this.analysisService.loadStudentsOrder();

    if (savedOrder?.length) {
      this.students = savedOrder;
      this.analysisService.updateStudentsOrder(savedOrder)
    }

    // Subscribe to updates
    this.analysisService.students$
      .pipe(takeUntil(this.destroy$))
      .subscribe(students => {
        this.students = students;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDrop(event: CdkDragDrop<student[]>) {
    moveItemInArray(this.students, event.previousIndex, event.currentIndex);
    // Update your service to persist the order
    this.analysisService.updateStudentsOrder([...this.students]);
  }

  removeStudent(studentName: string, event: MouseEvent) {
    event.stopPropagation(); // Prevent panel expansion when clicking remove
    this.analysisService.removeStudent(studentName)
  }
}