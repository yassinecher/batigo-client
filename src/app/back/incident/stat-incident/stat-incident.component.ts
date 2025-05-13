import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { IncidentService } from 'src/app/Service/incident.service';

@Component({
  selector: 'app-stat-incident',
  templateUrl: './stat-incident.component.html',
  styleUrls: ['./stat-incident.component.scss']
})
export class StatIncidentComponent implements OnInit {
  incidents: any[] = [];
  chart: any;
  stats: any = {};

  // Configuration du graphique
  chartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: "Nombre d'incidents",
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  };

  constructor(private incidentService: IncidentService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.incidentService.getAllIncidents().subscribe((data) => {
      this.incidents = data;
      this.prepareStatistics();
      this.createChart();
    });
  }

  private prepareStatistics(): void {
    // Statistiques par mois
    const monthlyStats = new Map<string, number>();
    
    // Statistiques par statut (si votre modèle contient un champ 'status')
    const statusStats = new Map<string, number>();

    this.incidents.forEach(incident => {
      const date = new Date(incident.date);
      
      // Groupement par mois/année
      const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
      monthlyStats.set(monthKey, (monthlyStats.get(monthKey) || 0) + 1);

      // Groupement par statut
      if (incident.status) {
        statusStats.set(incident.status, (statusStats.get(incident.status) || 0) + 1);
      }
    });

    // Préparation des données pour le graphique
    this.chartConfig.data.labels = Array.from(monthlyStats.keys());
    this.chartConfig.data.datasets[0].data = Array.from(monthlyStats.values());

    // Calcul des indicateurs clés
    this.stats = {
      total: this.incidents.length,
      last30Days: this.incidents.filter(i => this.isWithinLastDays(i.date, 30)).length,
      byStatus: Array.from(statusStats).map(([status, count]) => ({ status, count }))
    };
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    
    const ctx = document.getElementById('incidentChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, this.chartConfig);
  }

  private isWithinLastDays(incidentDate: string, days: number): boolean {
    const date = new Date(incidentDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  }
}