import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateByAiComponent } from './generate-by-ai.component';

describe('GenerateByAiComponent', () => {
  let component: GenerateByAiComponent;
  let fixture: ComponentFixture<GenerateByAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateByAiComponent]
    });
    fixture = TestBed.createComponent(GenerateByAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
