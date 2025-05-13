import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ProjetService } from 'src/app/Service/projet.service';
import { ExpenseMLInput, ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-show-projet',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, BaseChartDirective],
  templateUrl: './show-projet.component.html',
  styleUrls: ['./show-projet.component.scss']
})
export class ShowProjetComponent implements OnInit {
  project: any = null;
  predictedBudget: number | null = null;
  errorMessage: string | null = null;

  public doughnutChartData: ChartConfiguration['data'] = {
    labels: ['Budget', 'Expenses', 'Incomes'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#007bff', '#dc3545', '#28a745']
      }
    ]
  };
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetService: ProjetService,
    private serviceFinance: ServiceFinance
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.loadProject(+id);
    } else {
      this.errorMessage = 'Invalid project ID';
    }
  }

  loadProject(id: number): void {
    this.projetService.getProjectById(id).subscribe({
      next: (project) => {
        this.project = project;
        console.log('Project loaded:', project);
        this.updateChart();
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.errorMessage = 'Failed to load project: ' + err.message;
      }
    });
  }

  updateChart(): void {
    if (!this.project) {
      console.warn('No project data');
      return;
    }
    const budget = isNaN(Number(this.project.budget)) ? 0 : Number(this.project.budget);
    const expenses = isNaN(Number(this.project.totalExpenses)) ? 0 : Number(this.project.totalExpenses);
    const incomes = isNaN(Number(this.project.totalIncomes)) ? 0 : Number(this.project.totalIncomes);
    console.log('Chart data:', { budget, expenses, incomes });
    this.doughnutChartData.datasets[0].data = [budget, expenses, incomes];
    if (this.chart) {
      this.chart.update();
      console.log('Chart updated');
    }
  }

  predictBudget(): void {
    if (!this.project) return;
    const input: ExpenseMLInput = {
   type_projet: this.project.projetType.toLowerCase() === 'batiment'
  ? 'Bâtiment'
  : this.project.projetType.charAt(0).toUpperCase() + this.project.projetType.slice(1).toLowerCase(),
   budget_estime: Number(this.project.budget) || 0,
      duree_estimee: this.calculateDuration(this.project.dateDebut, this.project.dateFinPrevue),
      incident_qualite: 0,
      incident_securite: 0,
      materiaux_defectueux: 0,
      conditions_meteo: 'Bonnes'
    };
    this.serviceFinance.predictExpense(input).subscribe({
      next: (prediction) => {
        this.predictedBudget = prediction.prediction;
        console.log(`Predicted Budget for ${this.project.nom}: ${prediction}`);
      },
      error: (err) => console.error('Prediction error:', err)
    });
  }

  calculateDuration(start: string, end: string): number {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return isNaN(startDate.getTime()) || isNaN(endDate.getTime()) 
      ? 0 
      : Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}