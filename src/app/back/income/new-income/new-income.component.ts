import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
 
import { Income } from 'src/app/models/Income';
import { Projet } from 'src/app/models/Projet';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-new-income',
  templateUrl: './new-income.component.html',
  styleUrls: ['./new-income.component.scss']
})
export class NewIncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  projets: Projet[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceFinance: ServiceFinance,
    private router: Router
  ) {}

   ngOnInit(): void {
       this.incomeForm = this.fb.group({
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
   
     // 🔥 VALIDATEUR PERSONNALISÉ : La date doit être aujourd’hui ou plus tard
     futureDateValidator(control: AbstractControl): ValidationErrors | null {
       if (!control.value) return null; // Pas d'erreur si le champ est vide (déjà géré par Validators.required)
   
       const today = new Date();
       today.setHours(0, 0, 0, 0); // On enlève l'heure pour comparer uniquement la date
   
       const selectedDate = new Date(control.value);
       if (selectedDate < today) {
         return { invalidDate: true }; // Erreur si la date est dans le passé
       }
   
       return null;
     }
   
     // 🔥 GESTION DES ERREURS : Vérifie si un champ a une erreur et doit être affiché
     hasError(field: string, error: string): boolean {
       const control = this.incomeForm.get(field);
       return !!(control && control.hasError(error) && control.touched);
     }
   
     // 🔥 FORCER L'AFFICHAGE DES ERREURS AU PREMIER SUBMIT
     onSubmit(): void {
       if (this.incomeForm.invalid) {
         this.incomeForm.markAllAsTouched(); // 🔥 Force l'affichage des erreurs
         return;
       }
   
       const formValue = this.incomeForm.value;
       const NewIncome: Income = {
         amount: formValue.amount,
         date: formValue.date,
         source: formValue.source,
         projetId: Number(formValue.projetId)
       };
   
       console.log('Form Value:', NewIncome);
   
       this.serviceFinance.addIncome(NewIncome).subscribe({
         next: (response) => {
           console.log('Income added successfully:', response);
           this.router.navigate(['/dashboard/income']);
         },
         error: (err) => {
           console.error('Error adding income:', err);
         }
       });
     }
   }
   