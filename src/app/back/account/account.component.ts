import { Component } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  accounts: Account[] = [];

  constructor(public serviceFinance: ServiceFinance) {}

  ngOnInit(): void {
    this.serviceFinance.getAll().subscribe(
      (data) => {
        this.accounts = data;
        console.log('Données reçues :', this.accounts);
      },
      (error) => {
        console.error('Erreur lors de la récupération des comptes', error);
      }
    );
  }
}
