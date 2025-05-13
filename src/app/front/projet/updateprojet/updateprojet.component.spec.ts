import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprojetComponent } from './updateprojet.component';

describe('UpdateprojetComponent', () => {
  let component: UpdateprojetComponent;
  let fixture: ComponentFixture<UpdateprojetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateprojetComponent]
    });
    fixture = TestBed.createComponent(UpdateprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
