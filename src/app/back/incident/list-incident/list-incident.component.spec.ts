import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIncidentComponent } from './list-incident.component';

describe('ListIncidentComponent', () => {
  let component: ListIncidentComponent;
  let fixture: ComponentFixture<ListIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListIncidentComponent]
    });
    fixture = TestBed.createComponent(ListIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
