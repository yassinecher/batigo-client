import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-show-expense',
  templateUrl: './show-expense.component.html',
  styleUrls: ['./show-expense.component.scss']
})
export class ShowExpenseComponent implements OnInit {
   expense: Expense | null = null;
  
    constructor(
      private serviceFinance: ServiceFinance,
      private route: ActivatedRoute,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      const expenseId = this.route.snapshot.paramMap.get('id');
      if (expenseId) {
        this.serviceFinance.getExpenseById(+expenseId).subscribe({
          next: (data) => {
            this.expense = data;
          },
          error: (err) => {
            console.error('Error fetching income data:', err);
          }
        });
      }
    }
  
    goBack(): void {
      this.router.navigate(['/dashboard/expense']);
    }

}
