import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetlistComponent } from './projetlist.component';

describe('ProjetlistComponent', () => {
  let component: ProjetlistComponent;
  let fixture: ComponentFixture<ProjetlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetlistComponent]
    });
    fixture = TestBed.createComponent(ProjetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
