import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPieChartsComponent } from './student-pie-charts.component';

describe('StudentPieChartsComponent', () => {
  let component: StudentPieChartsComponent;
  let fixture: ComponentFixture<StudentPieChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentPieChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPieChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
