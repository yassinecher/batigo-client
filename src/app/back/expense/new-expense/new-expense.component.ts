import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
 
import { Expense } from 'src/app/models/Expense';
import { Projet } from 'src/app/models/Projet';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  projets: Projet[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceFinance: ServiceFinance,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      date: [null, [Validators.required, this.futureDateValidator]],
      source: ['', [Validators.required, Validators.minLength(3)]],
      projetId: ['', Validators.required]
    });

    this.serviceFinance.getAll().subscribe({
      next: (data: Projet[]) => {
        this.projets = data;
      },
      error: (err) => console.error('Error fetching projets:', err)
    });
  }

  
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;  

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const selectedDate = new Date(control.value);
    if (selectedDate < today) {
      return { invalidDate: true }; 
    }

    return null;
  }

  
  hasError(field: string, error: string): boolean {
    const control = this.expenseForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }

  
  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();  
      return;
    }

    const formValue = this.expenseForm.value;
    const newExpense: Expense = {
      amount: formValue.amount,
      date: formValue.date,
      source: formValue.source,
      projetId: Number(formValue.projetId)
    };

    console.log('Form Value:', newExpense);

    this.serviceFinance.addExpense(newExpense).subscribe({
      next: (response) => {
        console.log('Expense added successfully:', response);
        this.router.navigate(['/dashboard/expense']);
      },
      error: (err) => {
        console.error('Error adding expense:', err);
      }
    });
  }
}
