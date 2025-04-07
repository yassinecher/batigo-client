import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrductComponent } from './form-prduct.component';

describe('FormPrductComponent', () => {
  let component: FormPrductComponent;
  let fixture: ComponentFixture<FormPrductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPrductComponent]
    });
    fixture = TestBed.createComponent(FormPrductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
