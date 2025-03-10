import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoComponent } from './student-info.component';

describe('StudentInfoComponent', () => {
  let component: StudentInfoComponent;
  let fixture: ComponentFixture<StudentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
