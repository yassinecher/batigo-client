import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { Expense } from 'src/app/models/Expense';
import { Projet } from 'src/app/models/Projet';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  projetId: number;
  projet: Expense;
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
    this.expenseForm = this.fb.group({
      id: [null],
      amount: [null],
      date: [''],
      category: [''],
      projetId: [null]
    });

    // Récupération des comptes
    this.serviceFinance.getAll().subscribe({
      next: (data: Projet[]) => {
        this.projets = data;
      },
      error: (err) => console.error('Error fetching projets:', err)
    });

    // Récupération des données de l'expense
    this.serviceFinance.getExpenseById(this.projetId).subscribe({
      next: (data: Expense) => {
        this.projet = data;
        this.expenseForm.patchValue(this.projet);
      },
      error: (err) => console.error('Error fetching expense data:', err)
    });
  }

  // Soumission du formulaire
  onSubmit(): void {
    const updatedExpense: Expense = {
      id: this.projetId,
      amount: this.expenseForm.value.amount,
      date: this.expenseForm.value.date,
      source: this.expenseForm.value.source,
      projetId: this.expenseForm.value.projetId
    };

    this.serviceFinance.updateExpense(updatedExpense).subscribe({
      next: (response) => {
        console.log('Expense updated successfully:', response);
        this.router.navigate(['/dashboard/expense']);
      },
      error: (err) => {
        console.error('Error updating expense:', err);
      }
    });
  }
}
