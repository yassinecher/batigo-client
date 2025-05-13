import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidentComponent } from './add-incident.component';

describe('AddIncidentComponent', () => {
  let component: AddIncidentComponent;
  let fixture: ComponentFixture<AddIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncidentComponent]
    });
    fixture = TestBed.createComponent(AddIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
