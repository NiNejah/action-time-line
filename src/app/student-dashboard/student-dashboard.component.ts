import { Component, Input } from '@angular/core';
import { DisplaySettings, student } from '../type';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {
  @Input() student!: student;
  @Input() displaySettings!: DisplaySettings;
}