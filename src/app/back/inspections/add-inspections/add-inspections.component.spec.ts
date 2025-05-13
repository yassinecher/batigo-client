import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectionsComponent } from './add-inspections.component';

describe('AddInspectionsComponent', () => {
  let component: AddInspectionsComponent;
  let fixture: ComponentFixture<AddInspectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInspectionsComponent]
    });
    fixture = TestBed.createComponent(AddInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
