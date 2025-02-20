import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelivrableComponent } from './updatelivrable.component';

describe('UpdatelivrableComponent', () => {
  let component: UpdatelivrableComponent;
  let fixture: ComponentFixture<UpdatelivrableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatelivrableComponent]
    });
    fixture = TestBed.createComponent(UpdatelivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
