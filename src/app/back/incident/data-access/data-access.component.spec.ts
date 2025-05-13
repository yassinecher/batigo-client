import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAccessComponent } from './data-access.component';

describe('DataAccessComponent', () => {
  let component: DataAccessComponent;
  let fixture: ComponentFixture<DataAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataAccessComponent]
    });
    fixture = TestBed.createComponent(DataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
