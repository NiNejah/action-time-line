import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnalysisComponent } from './student-analysis.component';

describe('StudentAnalysisComponent', () => {
  let component: StudentAnalysisComponent;
  let fixture: ComponentFixture<StudentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
