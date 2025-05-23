import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFournisseurComponent } from './update-fournisseur.component';

describe('UpdateFournisseurComponent', () => {
  let component: UpdateFournisseurComponent;
  let fixture: ComponentFixture<UpdateFournisseurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFournisseurComponent]
    });
    fixture = TestBed.createComponent(UpdateFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
