import { Component, Inject, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexNonAxisChartSeries, ApexLegend } from 'ng-apexcharts';
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-project-statistics',
  templateUrl: './project-statistics.component.html',
  styleUrls: ['./project-statistics.component.scss']
})
export class ProjectStatisticsComponent implements OnInit {
   
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;
  projectId: number = 1;

  // Options du graphique circulaire
  public chartOptions: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
  } = {
    series: [],
    chart: {
      width: 500,
      type: 'pie'
    },
    labels: ['Total Incomes', 'Total Expenses', 'Balance'],
    dataLabels: {
      enabled: true
    },
    legend: {
      position: 'bottom'
    }
  };

  constructor(private serviceFinance: ServiceFinance) {}

  ngOnInit(): void {
    this.serviceFinance.getProjetStatistics(this.projectId).subscribe({
      next: (stats) => {
        this.totalIncomes = stats.totalIncomes;
        this.totalExpenses = stats.totalExpenses;
        this.balance = stats.balance;

        // Mettre à jour les données du graphique
        this.chartOptions.series = [
          this.totalIncomes,
          this.totalExpenses,
          this.balance
        ];
      },
      error: (err) => console.error('Erreur lors de la récupération des statistiques', err)
    });
  }
  
}
