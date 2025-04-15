import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelivrableComponent } from './createlivrable.component';

describe('CreatelivrableComponent', () => {
  let component: CreatelivrableComponent;
  let fixture: ComponentFixture<CreatelivrableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatelivrableComponent]
    });
    fixture = TestBed.createComponent(CreatelivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
