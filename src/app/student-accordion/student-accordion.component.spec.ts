import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccordionComponent } from './student-accordion.component';

describe('StudentAccordionComponent', () => {
  let component: StudentAccordionComponent;
  let fixture: ComponentFixture<StudentAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
