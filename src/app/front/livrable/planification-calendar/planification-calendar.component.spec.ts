import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationCalendarComponent } from './planification-calendar.component';

describe('PlanificationCalendarComponent', () => {
  let component: PlanificationCalendarComponent;
  let fixture: ComponentFixture<PlanificationCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificationCalendarComponent]
    });
    fixture = TestBed.createComponent(PlanificationCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
