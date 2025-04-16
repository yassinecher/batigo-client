import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIncidentComponent } from './manage-incident.component';

describe('ManageIncidentComponent', () => {
  let component: ManageIncidentComponent;
  let fixture: ComponentFixture<ManageIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageIncidentComponent]
    });
    fixture = TestBed.createComponent(ManageIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
