import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveComponent } from './admin-approve.component';

describe('AdminApproveComponent', () => {
  let component: AdminApproveComponent;
  let fixture: ComponentFixture<AdminApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApproveComponent]
    });
    fixture = TestBed.createComponent(AdminApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
