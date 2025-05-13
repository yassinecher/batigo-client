import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetAdminComponent } from './projet-admin.component';

describe('ProjetAdminComponent', () => {
  let component: ProjetAdminComponent;
  let fixture: ComponentFixture<ProjetAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetAdminComponent]
    });
    fixture = TestBed.createComponent(ProjetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
