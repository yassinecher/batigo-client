import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageInspectionComponent } from './manage-inspection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionsService } from '../data-access/inspections.service';
import { of } from 'rxjs';

describe('ManageInspectionComponent', () => {
  let component: ManageInspectionComponent;
  let fixture: ComponentFixture<ManageInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ManageInspectionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }
        },
        {
          provide: InspectionsService,
          useValue: {
            getResultatOptions: () => of([
              { value: 'EN_COURS_INSPECTION', label: "En cours d'inspection" },
              { value: 'NON_INSPECTE', label: 'Non inspecté' },
              { value: 'INSPECTION_RESOLUE', label: 'Inspection résolue' }
            ]),
            getInspectionById: () => of({
              id: 1,
              responsable: 'Ali',
              objet: 'Test Objet',
              dateInspection: '2024-05-01T00:00:00',
              resultat: 'EN_COURS_INSPECTION',
              incidents: { id: 1 }
            }),
            updateInspection: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
