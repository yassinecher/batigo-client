import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService } from '../data-access/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit {

  addIncidentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des champs vides
    this.addIncidentForm = this.fb.group({
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      gravite: ['', [Validators.required]],  // Ajout du champ gravité
      etat: ['', [Validators.required]],    // Ajout du champ état
      responsable: ['', [Validators.required]] // Ajout du champ responsable
    });
  }

  // Méthode de soumission du formulaire
  onSubmit(): void {
    if (this.addIncidentForm.valid) {
      const newIncident: any = this.addIncidentForm.value;

      // Appel au service pour ajouter l'incident
      this.incidentService.createIncident(newIncident).subscribe(
        (response) => {
          console.log('Incident ajouté avec succès', response);
          // Rediriger vers la liste des incidents
          this.router.navigate(['/incident']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'incident', error);
          alert('Une erreur est survenue lors de l\'ajout de l\'incident');
        }
      );
    }
  }

  // Récupération des contrôles du formulaire
  get f() {
    return this.addIncidentForm.controls;
  }

  // Méthode pour revenir à la liste des incidents
  backToList(): void {
    this.router.navigate(['/incident']);
  }
}
