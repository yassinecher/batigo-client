import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrablelistComponent } from './livrablelist.component';

describe('LivrablelistComponent', () => {
  let component: LivrablelistComponent;
  let fixture: ComponentFixture<LivrablelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivrablelistComponent]
    });
    fixture = TestBed.createComponent(LivrablelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
