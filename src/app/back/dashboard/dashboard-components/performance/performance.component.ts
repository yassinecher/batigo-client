import { Component, OnInit } from '@angular/core';
import { ServiceFinance } from 'src/service/ServiceFinance';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  performances: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private serviceFinance: ServiceFinance) {}

  ngOnInit(): void {
    this.loadPerformances();
  }

  loadPerformances(): void {
    this.loading = true;
    this.errorMessage = '';

    this.serviceFinance.getAllPerformance().subscribe({
      next: (data) => {
        this.performances = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des données';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  getTotal(items: number[]): number {
    return items.reduce((a, b) => a + b, 0);
  }

  refreshData(): void {
    this.loadPerformances();
  }
  exportToPDF(): void {
    const element = document.querySelector('.performance-table-container') as HTMLElement;
    if (!element) {
      console.error('Aucun élément à exporter.');
      return;
    }

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('performance-financiere.pdf');
    });
  }
}