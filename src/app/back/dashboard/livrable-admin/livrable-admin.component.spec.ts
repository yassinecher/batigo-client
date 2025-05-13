import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableAdminComponent } from './livrable-admin.component';

describe('LivrableAdminComponent', () => {
  let component: LivrableAdminComponent;
  let fixture: ComponentFixture<LivrableAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivrableAdminComponent]
    });
    fixture = TestBed.createComponent(LivrableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
