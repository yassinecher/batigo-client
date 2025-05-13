import { Component, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexFill,
  ApexDataLabels,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import { Livrable, Statut } from '../../model/livrable.model';
import { LivrableService } from 'src/app/Service/livrable.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
};

export type ScatterChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-livrable-statistics',
  templateUrl: './livrable-statistics.component.html',
  styleUrls: ['./livrable-statistics.component.scss']
})
export class LivrableStatisticsComponent implements OnInit {
  livrables: Livrable[] = [];
  public Statut = Statut;

  // Pie Chart Options (only EN_ATTENTE, EN_COURS, TERMINE)
  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      width: 380,
      type: 'pie',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      background: 'transparent',
      toolbar: { show: true }
    },
    labels: ['EN_ATTENTE', 'EN_COURS', 'TERMINE'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' }
        }
      }
    ],
    title: {
      text: 'Livrable Status Distribution',
      style: { fontSize: '18px', fontWeight: 'bold', color: '#333' }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        // Only three colors are needed now.
        gradientToColors: ['#ABE5A1', '#55C1E7', '#FFBB44'],
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0.8,
        stops: [0, 50, 100]
      }
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: '16px', colors: ['#333'] }
    },
    tooltip: {
      enabled: true,
      theme: 'dark'
    }
  };

  // Scatter Chart Options (XY chart): Expected Delivery Date vs. Delay (in days)
  public xyChartOptions: ScatterChartOptions = {
    series: [],
    chart: {
      height: 350,
      type: 'scatter',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 700,
      },
      background: 'transparent',
      toolbar: { show: true }
    },
    xaxis: {
      type: 'datetime',
      title: { text: 'Expected Delivery Date' }
    },
    yaxis: {
      title: { text: 'Delay (days)' }
    },
    dataLabels: {
      enabled: true,
      formatter: (value: number) => value.toFixed(0),
      style: { fontSize: '14px' }
    },
    tooltip: { theme: 'dark' },
    title: {
      text: 'Livrable Delay Scatter Chart',
      style: { fontSize: '18px', fontWeight: 'bold', color: '#333' }
    }
  };

  // Computed counts for summary section (only three statuses)
  pendingCount: number = 0;
  inProgressCount: number = 0;
  completedCount: number = 0;

  constructor(private livrableService: LivrableService) {}

  ngOnInit(): void {
    this.fetchLivrables();
  }

  fetchLivrables(): void {
    this.livrableService.getLivrables().subscribe((data: Livrable[]) => {
      this.livrables = data;

      // Calculate counts for the three statuses only
      this.pendingCount = this.livrables.filter(l => l.statut === Statut.EN_ATTENTE).length;
      this.inProgressCount = this.livrables.filter(l => l.statut === Statut.EN_COURS).length;
      this.completedCount = this.livrables.filter(l => l.statut === Statut.TERMINE).length;

      // Update pie chart series
      this.chartOptions.series = [
        this.pendingCount,
        this.inProgressCount,
        this.completedCount
      ];

      // Build scatter chart data: for each livrable with both dates, compute delay (in days)
      const scatterData = this.livrables
        .filter(l => l.dateRemisePrevue && l.dateRemiseReelle)
        .map(l => {
          const expected = new Date(l.dateRemisePrevue).getTime();
          const actual = new Date(l.dateRemiseReelle!).getTime();
          const delayDays = Math.round((actual - expected) / (1000 * 3600 * 24));
          return { x: expected, y: delayDays };
        });
      
      // Update scatter chart series
      this.xyChartOptions.series = [
        { name: 'Delay', data: scatterData }
      ];
    });
  }
}
