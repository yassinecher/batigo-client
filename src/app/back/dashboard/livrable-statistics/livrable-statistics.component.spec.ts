import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableStatisticsComponent } from './livrable-statistics.component';

describe('LivrableStatisticsComponent', () => {
  let component: LivrableStatisticsComponent;
  let fixture: ComponentFixture<LivrableStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivrableStatisticsComponent]
    });
    fixture = TestBed.createComponent(LivrableStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
