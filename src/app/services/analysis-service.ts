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


  updateStudentsOrder(students: student[]): void {
    // Update local state
    this.studentsSubject.next(students);

    // Persist to localStorage
    this.saveStudentsOrder(students);
  }

  private saveStudentsOrder(students: student[]): void {
    try {
      localStorage.setItem('studentsOrder', JSON.stringify(students));
    } catch (error) {
      console.error('Failed to save students order:', error);
    }
  }

  loadStudentsOrder(): student[] | null {
    try {
      const order = localStorage.getItem('studentsOrder');
      return order ? JSON.parse(order) : null;
    } catch (error) {
      console.error('Failed to load students order:', error);
      return null;
    }
  }

  removeStudent(studentName: string) {
    const currentStudents = this.studentsSubject.value;
    const updatedStudents = currentStudents.filter(s => s.name !== studentName);
    this.updateStudents(updatedStudents);
    this.updateStudentsOrder(updatedStudents);
  }
}