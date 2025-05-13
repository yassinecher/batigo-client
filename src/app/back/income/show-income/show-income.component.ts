import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceFinance } from 'src/service/ServiceFinance';
import { Income } from 'src/app/models/Income';

@Component({
  selector: 'app-show-income',
  templateUrl: './show-income.component.html',
  styleUrls: ['./show-income.component.scss']
})
export class ShowIncomeComponent implements OnInit {
  income: Income | null = null;

  constructor(
    private serviceFinance: ServiceFinance,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const incomeId = this.route.snapshot.paramMap.get('id');
    if (incomeId) {
      this.serviceFinance.getIncomeById(+incomeId).subscribe({
        next: (data) => {
          this.income = data;
        },
        error: (err) => {
          console.error('Error fetching income data:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/income']);
  }
}
