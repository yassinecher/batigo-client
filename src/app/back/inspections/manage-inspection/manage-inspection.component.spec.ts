import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInspectionComponent } from './manage-inspection.component';

describe('ManageInspectionComponent', () => {
  let component: ManageInspectionComponent;
  let fixture: ComponentFixture<ManageInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInspectionComponent]
    });
    fixture = TestBed.createComponent(ManageInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
