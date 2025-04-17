import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/models/Projet';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.scss']
})
export class EditProjetComponent implements OnInit {
  projetForm: FormGroup;
  projet: Projet;

  constructor(
    private serviceFinance: ServiceFinance,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const projetId = this.route.snapshot.paramMap.get('id');
    if (projetId) {
      this.serviceFinance.getProjetById(+projetId).subscribe((projet: Projet) => {
        this.projet = projet;
        // Initialiser le formulaire avec les données du projet
        this.projetForm = this.fb.group({
          nom: [this.projet.nom, [Validators.required, Validators.minLength(3)]],
          adresse: [this.projet.adresse, [Validators.required]],
          type: [this.projet.type, Validators.required]
        });
      });
    }
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      const updatedProjet: Projet = this.projetForm.value;
      this.serviceFinance.updateProjet(updatedProjet).subscribe((response: Projet) => {
        console.log('Projet updated successfully:', response);
        this.router.navigate(['/dashboard/projets']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
