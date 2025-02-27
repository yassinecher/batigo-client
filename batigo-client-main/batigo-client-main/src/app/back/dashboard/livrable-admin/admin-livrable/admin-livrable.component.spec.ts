import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLivrableComponent } from './admin-livrable.component';

describe('AdminLivrableComponent', () => {
  let component: AdminLivrableComponent;
  let fixture: ComponentFixture<AdminLivrableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLivrableComponent]
    });
    fixture = TestBed.createComponent(AdminLivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
