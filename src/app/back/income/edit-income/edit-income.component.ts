import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { Income } from 'src/app/models/Income';
import { Projet } from 'src/app/models/Projet';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.scss']
})
export class EditIncomeComponent implements OnInit {
  incomeForm: FormGroup;
  projetId: number;
  projet: Income;
  projets: Projet[] = []; // Liste des comptes

  constructor(
    private fb: FormBuilder,
    private serviceFinance: ServiceFinance,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID de l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projetId = +id;
    } else {
      console.error("ID not found in route");
      return;
    }

    // Initialisation du formulaire
    this.incomeForm = this.fb.group({
      id: [null],
      amount: [null],
      date: [''],
      source: [''],
      projetId: [null]
    });

    // Récupération des comptes
    this.serviceFinance.getAll().subscribe({
      next: (data: Projet[]) => {
        this.projets = data;
      },
      error: (err) => console.error('Error fetching projets:', err)
    });

    // Récupération des données de l'income
    this.serviceFinance.getIncomeById(this.projetId).subscribe({
      next: (data: Income) => {
        this.projet = data;
        this.incomeForm.patchValue(this.projet);
      },
      error: (err) => console.error('Error fetching projet data:', err)
    });
  }

  // Soumission du formulaire
  onSubmit(): void {
    const updatedIncome: Income = {
      id: this.projetId,
      amount: this.incomeForm.value.amount,
      date: this.incomeForm.value.date,
      source: this.incomeForm.value.source,
      projetId: this.incomeForm.value.projetId
    };

    this.serviceFinance.updateIncome(updatedIncome).subscribe({
      next: (response) => {
        console.log('Income updated successfully:', response);
        this.router.navigate(['/dashboard/income']);
      },
      error: (err) => {
        console.error('Error updating income:', err);
      }
    });
  }
}
