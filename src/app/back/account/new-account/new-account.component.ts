import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/Account';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {

  accountForm: FormGroup;
  accounts: Account[] = [];

  constructor(
    private serviceFinance: ServiceFinance,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Récupérer tous les comptes à l'initialisation du composant
    this.serviceFinance.getAll().subscribe((data: Account[]) => {
      this.accounts = data;
    });

    // Initialiser le formulaire pour ajouter un nouveau compte
    this.accountForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      balance: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required]
    });
  }

  // Méthode pour soumettre le formulaire et ajouter un compte
  onSubmit() {
    if (this.accountForm.valid) {
      const newAccount: Account = this.accountForm.value;
      this.serviceFinance.add(newAccount).subscribe((response) => {
        console.log('Account added successfully:', response);
        this.accounts.push(response); // Ajouter le nouveau compte à la liste des comptes
        this.accountForm.reset(); // Réinitialiser le formulaire après ajout
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
