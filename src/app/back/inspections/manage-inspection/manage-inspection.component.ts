import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspectionsService } from '../data-access/inspections.service';

@Component({
  selector: 'app-manage-inspection',
  templateUrl: './manage-inspection.component.html',
  styleUrls: ['./manage-inspection.component.scss']
})
export class ManageInspectionComponent implements OnInit {

  editInspectionForm!: FormGroup;
  inspectionId!: number;
  inspectionData: any;
  resultatOptions: { value: string, label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inspectionId = +this.route.snapshot.params['id'];

    this.editInspectionForm = this.fb.group({
      responsable: ['', [Validators.required, Validators.minLength(3)]],
      objet: ['', [Validators.required]],
      dateInspection: ['', [Validators.required]],
      resultat: ['', [Validators.required]]
    });

    // Charger options enum
    this.inspectionService.getResultatOptions().subscribe(
      (options) => {
        console.log("✅ Options enum chargées :", options);
        this.resultatOptions = options;

        // Charger les données
        this.inspectionService.getInspectionById(this.inspectionId).subscribe((data) => {
          console.log("📦 Données inspection :", data);
          this.inspectionData = data;
          const formattedDate = data.dateInspection?.split('T')[0] ?? '';

          this.editInspectionForm.patchValue({
            responsable: data.responsable,
            objet: data.objet,
            dateInspection: formattedDate,
            resultat: typeof data.resultat === 'object' ? data.resultat.value : data.resultat
          });
        });
      },
      (error) => {
        console.error("❌ Erreur chargement enum :", error);
      }
    );
  }

  onSubmit(): void {
    if (this.editInspectionForm.valid) {
      const updatedInspection = {
        ...this.editInspectionForm.value,
        incidents: {
          id: this.inspectionData?.incidents?.id || null
        }
      };

      console.log("🚀 Mise à jour inspection envoyée :", updatedInspection);

      this.inspectionService.updateInspection(this.inspectionId, updatedInspection).subscribe(
        () => {
          this.router.navigate(['/inspections/listinsp', updatedInspection.incidents.id]);
        },
        (error) => {
          console.error("❌ Erreur lors de la mise à jour :", error);
        }
      );
    } else {
      console.warn("⚠️ Formulaire invalide", this.editInspectionForm.value);
    }
  }

  get f() {
    return this.editInspectionForm.controls;
  }

  backToList(): void {
    this.router.navigate(['/inspections/listinsp', this.inspectionData?.incidents?.id || '']);
  }
}
