import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
 import {catchError, forkJoin, map, Observable, throwError} from "rxjs";

import { Income } from 'src/app/models/Income';
import { Expense  } from 'src/app/models/Expense';
import { Projet } from 'src/app/models/Projet';
import { PerformanceDTO } from 'src/app/models/performance.dto';
 


 

@Injectable({
  providedIn: 'root'  
})export class ServiceFinance {
  private baseUrl: string = 'http://localhost:8080/batigo/Projet';
  private incomeUrl: string = 'http://localhost:8080/batigo/income';
  private expenseUrl: string = 'http://localhost:8080/batigo/expense';
  private statisticsUrl: string = 'http://localhost:8080/batigo/statistics';
  private PerformanceUrl: string = 'http://localhost:8080/batigo/finance/performance';

  constructor(private http: HttpClient) {}

   
  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.baseUrl);
  }

   
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseUrl}/${id}`);
  }

   add(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.baseUrl}/add`, projet);
  }

   updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.baseUrl}/edit/${projet.id}`, projet);
  }

   deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }




////////////////////////INCOME///////////////////////////
 getAllIncome(): Observable<Income[]> {
  return this.http.get<Income[]>(this.incomeUrl);
}

 getIncomeById(id: number): Observable<Income> {
  return this.http.get<Income>(`${this.incomeUrl}/${id}`);
}

 addIncome(account: Income): Observable<Income> {
  return this.http.post<Income>(`${this.incomeUrl}/add`, account);
}

 updateIncome(account: Income): Observable<Income> {
  return this.http.put<Income>(`${this.incomeUrl}/edit/${account.id}`, account);
}

 deleteIncome(id: number): Observable<void> {
  return this.http.delete<void>(`${this.incomeUrl}/delete/${id}`);
}

///////////////////////////expense/////////////////////////

getAllExpense(): Observable<Expense[]> {
  return this.http.get<Expense[]>(this.expenseUrl);
}

// Récupérer une dépense par ID
getExpenseById(id: number): Observable<Expense> {
  return this.http.get<Expense>(`${this.expenseUrl}/${id}`);
}

addExpense(expense: Expense): Observable<Expense> {
  return this.http.post<Expense>(`${this.expenseUrl}/add`, expense);  
}


// Mettre à jour une dépense existante (correction du type de retour et du nom du paramètre)
updateExpense(expense: Expense): Observable<Expense> {
  return this.http.put<Expense>(`${this.expenseUrl}/edit/${expense.id}`, expense);
}

// Supprimer une dépense par ID
deleteExpense(id: number): Observable<void> {
  return this.http.delete<void>(`${this.expenseUrl}/delete/${id}`);
}
//////////////////////statistics/////////////
getIncomesByProjet(projetId: number): Observable<Income[]> {
  return this.http.get<Income[]>(`${this.incomeUrl}?projetId=${projetId}`);
}

 
getExpensesByProjet(projetId: number): Observable<Expense[]> {
  return this.http.get<Expense[]>(`${this.expenseUrl}?projetId=${projetId}`);
}

 
calculateTotalIncomes(incomes: Income[]): number {
  return incomes.reduce((total, income) => total + income.amount, 0);
}

 
calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

 
getProjetStatistics(projetId: number): Observable<{ totalIncomes: number; totalExpenses: number; balance: number }> {
  return forkJoin({
    incomes: this.getIncomesByProjet(projetId),
    expenses: this.getExpensesByProjet(projetId)
  }).pipe(
    map(({ incomes, expenses }) => {
      const totalIncomes = this.calculateTotalIncomes(incomes);
      const totalExpenses = this.calculateTotalExpenses(expenses);
      const balance = totalIncomes - totalExpenses;

      return { totalIncomes, totalExpenses, balance };
    })
  );
}

///////////performance////////////////////
 
getAllPerformance(): Observable<PerformanceDTO[]> {
  return this.http.get<PerformanceDTO[]>(this.PerformanceUrl);
}

}








