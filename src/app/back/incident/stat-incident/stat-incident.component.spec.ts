import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatIncidentComponent } from './stat-incident.component';

describe('StatIncidentComponent', () => {
  let component: StatIncidentComponent;
  let fixture: ComponentFixture<StatIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatIncidentComponent]
    });
    fixture = TestBed.createComponent(StatIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
