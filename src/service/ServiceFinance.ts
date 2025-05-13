import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
 import {catchError, forkJoin, map, Observable, throwError} from "rxjs";

import { Income } from 'src/app/models/Income';
import { Expense  } from 'src/app/models/Expense';
import { Projet } from 'src/app/models/Projet';
import { PerformanceDTO } from 'src/app/models/performance.dto';
import { environment } from 'src/environments/environment';
 


 

@Injectable({
  providedIn: 'root'  
})
export class ServiceFinance {

  private baseUrl: string = environment.apiUrl+'Projet';
  private incomeUrl: string = environment.apiUrl+'income';
  private expenseUrl: string =environment.apiUrl +'expense';
  private statisticsUrl: string =environment.apiUrl+ 'statistics';
  private PerformanceUrl: string =environment.apiUrl +'finance/performance';

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
 private apiUrl = 'http://localhost:5000';
getAllPerformance(): Observable<PerformanceDTO[]> {
  return this.http.get<PerformanceDTO[]>(this.PerformanceUrl);
}

  predictExpense(input: ExpenseMLInput): Observable<any> {
  
const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
return this.http.post('http://127.0.0.1:5000/predict', input, {headers
})

  }

  getDecisionTree(type: string = 'png'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/decision-tree?type=${type}`, { responseType: 'blob' });
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:9090/api/projets');
  }
}

export interface ExpenseMLInput {
  type_projet: string; // 'Batiment', 'Route', 'Pont'
  budget_estime: number;
  duree_estimee: number;
  incident_qualite: number;
  incident_securite: number;
  materiaux_defectueux: number;
  conditions_meteo: string; // 'Bonnes', 'Mauvaises'
}






