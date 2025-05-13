import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Projet } from 'src/app/models/Projet';  
import { ProjetService } from 'src/app/Service/projet.service';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-new-projet',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './new-projet.component.html',
  styleUrls: ['./new-projet.component.scss']
})
export class NewProjetComponent  {
  projectForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  projetTypes = ['BATIMENT', 'ROUTE', 'PONT'];
  etats = ['EN_COURS', 'TERMINE', 'EN_RETARD'];

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      etat: ['EN_COURS', Validators.required],
      responsable: ['', Validators.required],
      isArchived: [false],
      isApproved: [false],
 
      isTerminate: [false],
      projetType: ['BATIMENT', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    const formValue = this.projectForm.value;
    const projetDTO = {
      ...formValue,
      dateDebut: new Date(formValue.dateDebut).toISOString(),
      dateFinPrevue: new Date(formValue.dateFinPrevue).toISOString(),
      dateFinReelle: null,
      lastUpdated: null,
      scheduleStatus: null,
      totalExpenses: 0,
      totalIncomes: 0,
      livrables: [],
      carts: []
    };

    this.projetService.createProject1(projetDTO).subscribe({
      next: (created) => {
        this.successMessage = `Project "${created.nom}" created successfully`;
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/dashboard/projets']), 2000);
      },
      error: (err) => {
        console.error('Error creating project:', err);
        this.errorMessage = 'Failed to create project: ' + err.message;
        this.successMessage = null;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}