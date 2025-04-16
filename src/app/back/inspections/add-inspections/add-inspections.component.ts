import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InspectionsService } from '../data-access/inspections.service';

@Component({
  selector: 'app-add-inspections',
  templateUrl: './add-inspections.component.html',
  styleUrls: ['./add-inspections.component.scss']
})
export class AddInspectionsComponent implements OnInit {

  addInspectionForm!: FormGroup;
  incidentId!: number;
  resultatOptions: { value: string, label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID de l'incident depuis l'URL
    this.incidentId = +this.route.snapshot.params['id'];

    // Initialisation du formulaire
    this.addInspectionForm = this.fb.group({
      responsable: ['', [Validators.required, Validators.minLength(3)]],
      objet: ['', [Validators.required]],
      dateInspection: ['', [Validators.required]],
      resultat: ['', [Validators.required]]
    });

    // ✅ Charger les options de résultats directement depuis le backend
    this.inspectionService.getResultatOptions().subscribe(resultats => {
      this.resultatOptions = resultats;
    });
  }

  // ✅ Soumission du formulaire
  onSubmit(): void {
    if (this.addInspectionForm.valid) {
      const newInspection = this.addInspectionForm.value;

      this.inspectionService.createInspection(this.incidentId, newInspection).subscribe(
        () => {
          this.router.navigate(['/inspections/listinsp', this.incidentId]);
        },
        (error) => {
          console.error("Erreur lors de l'ajout de l'inspection", error);
        }
      );
    }
  }

  backToList(): void {
    history.back();
  }

  // ✅ Accès rapide aux contrôles du formulaire
  get f() {
    return this.addInspectionForm.controls;
  }
}
