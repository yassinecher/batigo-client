import { Component } from '@angular/core';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IncomeComponent {
  incomes: any[] = [];  // Liste des incomes
  filteredIncomes: any[] = [];  // Liste filtrée des incomes
  searchText: string = '';  // Texte de recherche
  currentPage: number = 1;  // Page actuelle de la pagination

  constructor(private serviceFinance: ServiceFinance) {}

  ngOnInit(): void {
    this.loadIncomes();
  }

  loadIncomes() {
    this.serviceFinance.getAllIncome().subscribe((data) => {
      this.incomes = data;
      this.filteredIncomes = data;  // Initialisation de la liste filtrée
    });
  }

  // Fonction de filtrage des incomes
  filterIncomes() {
    this.filteredIncomes = this.incomes.filter(income =>
      income.source.toLowerCase().includes(this.searchText.toLowerCase()) ||
      income.amount.toString().includes(this.searchText)
    );
  }

  // Fonction de suppression d'un income
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this income?')) {
      this.serviceFinance.deleteIncome(id).subscribe(() => {
        console.log('Income deleted successfully');
        this.filteredIncomes = this.filteredIncomes.filter(income => income.id !== id);
      });
    }
  }
}
