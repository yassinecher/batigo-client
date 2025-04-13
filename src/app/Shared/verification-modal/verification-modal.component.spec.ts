import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationModalComponent } from './verification-modal.component';

describe('VerificationModalComponent', () => {
  let component: VerificationModalComponent;
  let fixture: ComponentFixture<VerificationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationModalComponent]
    });
    fixture = TestBed.createComponent(VerificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
