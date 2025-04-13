import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LivraisonService } from './livraison.service';
import { formatDate } from '@angular/common';
import { Chart, ArcElement, CategoryScale, Tooltip, Legend, Title, PieController } from 'chart.js';

Chart.register(ArcElement, CategoryScale, Tooltip, Legend, PieController, Title);

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit, AfterViewInit {
  livraisons: any[] = [];
  commandes: any[] = [];
  livraison: any = {
    statusl: '',
    orderdate: '',
    commande: { idcommande: null }
  };
  isEditing = false;
  showForm = false;
  livReturneds = 0;
  livshippeds = 0;
  livDelivereds = 0;
  private pieChartInstance: any = null;

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.loadLivraisons();
    this.loadCommandes();
  }

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  loadLivraisons(): void {
    this.livraisonService.getAllLivraisons().subscribe((data) => {
      this.livraisons = data;
      this.buildStats();
    });
  }

  loadCommandes(): void {
    this.livraisonService.getAllCommandes().subscribe((data) => {
      this.commandes = data;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.isEditing = false;
    this.livraison = { statusl: '', orderdate: '', commande: { idcommande: null } };
  }

  editLivraison(livraison: any): void {
    this.livraison = { ...livraison };
    this.showForm = true;
    this.isEditing = true;
  }

  private formatDateForBackend(dateString: string): string {
    const date = new Date(dateString);
    return formatDate(date, 'yyyy-MM-dd HH:mm:ss', 'en-US').replace("T", " ");
  }

  onSubmit(livraisonForm: NgForm): void {
    livraisonForm.form.markAllAsTouched();

    if (livraisonForm.invalid) {
      return;
    }

    const payload = {
      id: this.livraison.id,
      statusl: this.livraison.statusl,
      orderdate: this.formatDateForBackend(this.livraison.orderdate),
      commande: { idcommande: this.livraison.commande.idcommande }
    };

    console.log('Payload:', payload);

    if (this.isEditing) {
      this.livraisonService.modifyLivraison(payload).subscribe(
        () => {
          this.loadLivraisons();
          this.cancelForm();
        },
        error => console.error('Error updating livraison:', error)
      );
    } else {
      this.livraisonService.addLivraison(payload).subscribe(() => {
        this.loadLivraisons();
        this.resetForm();
      });
    }
  }

  deleteLivraison(id: number): void {
    this.livraisonService.deleteLivraison(id).subscribe(() => {
      this.loadLivraisons();
    });
  }

  resetForm(): void {
    this.livraison = { statusl: '', orderdate: '', commande: { idcommande: null } };
    this.isEditing = false;
    this.showForm = false;
  }

  cancelForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.livraison = { statusl: '', orderdate: '', commande: { idcommande: null } };
  }

  buildStats(): void {
    this.livReturneds = this.livraisons.filter(l => l.statusl === 'Returned').length;
    this.livshippeds = this.livraisons.filter(l => l.statusl === 'Shipped').length;
    this.livDelivereds = this.livraisons.filter(l => l.statusl === 'Delivered').length;
    console.log("1",this.livraisons);

    this.createPieChart();
  }

  createPieChart(): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.pieChartInstance) this.pieChartInstance.destroy();

    this.pieChartInstance = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Returned', 'Shipped', 'Delivered'],
        datasets: [{
          data: [this.livReturneds, this.livshippeds, this.livDelivereds],
          backgroundColor: ['#ff9999', '#66b3ff', '#99ff99']
        }]
      }
    });
  }
  markShippedAsDelivered(): void {
    const toUpdate = this.livraisons.filter(l => l.statusl === 'Shipped');

    if (toUpdate.length === 0) {
      alert('No livraisons with status "Shipped" found.');
      return;
    }

    const updateRequests = toUpdate.map(l => {
      const updatedLivraison = {
        ...l,
        statusl: 'Delivered',
        orderdate: this.formatDateForBackend(l.orderdate),
        commande: { idcommande: l.commande.idcommande }
      };
      return this.livraisonService.modifyLivraison(updatedLivraison).toPromise();
    });

    Promise.all(updateRequests)
      .then(() => {
        alert('All "Shipped" livraisons have been marked as "Delivered".');
        this.loadLivraisons();
      })
      .catch(error => {
        console.error('Bulk update failed:', error);
      });
  }

}
