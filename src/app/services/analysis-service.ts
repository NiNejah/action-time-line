// analysis.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DisplaySettings, student } from '../type';

@Injectable({ providedIn: 'root' })
export class AnalysisService {
  studentsSubject = new BehaviorSubject<student[]>([]);
  settingsSubject = new BehaviorSubject<DisplaySettings>({
    showPie: { lib: 'Pie Charts', status: true },
    showTimeline: { lib: 'Timeline', status: true },
    showAnalysis: { lib: 'AI analysis', status: false }
  });
  loadingSubject = new BehaviorSubject<boolean>(false);



  students$: Observable<student[]> = this.studentsSubject.asObservable();
  settings$: Observable<DisplaySettings> = this.settingsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  updateStudents(students: student[]): void {
    this.studentsSubject.next(students);
  }

  updateSettings(settings: DisplaySettings): void {
    this.settingsSubject.next(settings);
  }

  setLoading(state: boolean): void {
    this.loadingSubject.next(state);
  }
}