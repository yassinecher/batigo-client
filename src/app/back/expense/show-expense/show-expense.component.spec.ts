import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExpenseComponent } from './show-expense.component';

describe('ShowExpenseComponent', () => {
  let component: ShowExpenseComponent;
  let fixture: ComponentFixture<ShowExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowExpenseComponent]
    });
    fixture = TestBed.createComponent(ShowExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
