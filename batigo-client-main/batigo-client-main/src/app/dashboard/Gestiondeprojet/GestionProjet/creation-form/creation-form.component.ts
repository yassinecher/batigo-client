import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from 'src/app/Service/Projet/projet.service';
import { Etat, Projet } from 'src/app/Model/Projet';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss']
})

export class CreationFormComponent implements OnInit {
  projetForm!: FormGroup;
  etats = Object.values(Etat);

  constructor(private fb: FormBuilder, private projetService: ProjetService) {}

  ngOnInit(): void {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      etat: [Etat.EN_COURS, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      const newProjet: Projet = this.projetForm.value;
      this.projetService.creerProjet(newProjet).subscribe(
        response => {
          console.log('Project created successfully', response);
          // Handle successful project creation (e.g., navigate to project list)
        },
        error => {
          console.error('Error creating project', error);
          // Handle error
        }
      );
    }
  }
}