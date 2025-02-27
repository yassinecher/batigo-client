import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlivrableComponent } from './viewlivrable.component';

describe('ViewlivrableComponent', () => {
  let component: ViewlivrableComponent;
  let fixture: ComponentFixture<ViewlivrableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewlivrableComponent]
    });
    fixture = TestBed.createComponent(ViewlivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
