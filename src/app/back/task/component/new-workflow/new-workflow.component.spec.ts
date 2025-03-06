import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkflowComponent } from './new-workflow.component';

describe('NewWorkflowComponent', () => {
  let component: NewWorkflowComponent;
  let fixture: ComponentFixture<NewWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWorkflowComponent]
    });
    fixture = TestBed.createComponent(NewWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
