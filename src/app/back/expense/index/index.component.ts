import { Component } from '@angular/core';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ExpenseComponent {
  expenses: any[] = []; // Stocke toutes les dépenses
  filteredExpenses: any[] = []; // Liste filtrée pour la recherche
  searchText: string = ''; // Texte de recherche
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 3; // Nombre d'éléments par page

  constructor(private serviceFinance: ServiceFinance) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.serviceFinance.getAllExpense().subscribe((data) => {
      this.expenses = data;
      this.filteredExpenses = data; // Initialisation de la liste filtrée
    });
  }

  filterExpenses() {
    this.filteredExpenses = this.expenses.filter(expense =>
      expense.source.toLowerCase().includes(this.searchText.toLowerCase()) ||
      expense.amount.toString().includes(this.searchText) ||
      expense.date.includes(this.searchText)
    );
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.serviceFinance.deleteExpense(id).subscribe(() => {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.filterExpenses(); // Mettre à jour la liste affichée
      });
    }
  }
}
