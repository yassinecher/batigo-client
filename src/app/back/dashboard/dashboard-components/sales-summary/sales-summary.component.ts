import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [CommonModule], // Ajoutez ceci
  templateUrl: './sales-summary.component.html',
   
  
})
export class ProjectStatisticsComponent implements OnInit {
  projectId: number;
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;

  constructor(
    private route: ActivatedRoute,
    private ServiceFinance: ServiceFinance
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;

    this.ServiceFinance.getProjetStatistics(this.projectId).subscribe({
      next: (stats) => {
        this.totalIncomes = stats.totalIncomes;
        this.totalExpenses = stats.totalExpenses;
        this.balance = stats.balance;
      },
      error: (err) => console.error('Error fetching project statistics:', err)
    });
  }
}
