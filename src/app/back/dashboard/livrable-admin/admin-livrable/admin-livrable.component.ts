import { Component, OnInit } from '@angular/core';
import { LivrableService } from 'src/app/Service/Livrable/livrable.service';
import { Livrable, Statut } from 'src/app/Model/livrable.model';


@Component({
  selector: 'app-admin-livrable',
  templateUrl: './admin-livrable.component.html',
  styleUrls: ['./admin-livrable.component.scss']
})
export class AdminLivrableComponent implements OnInit {
  livrables: Livrable[] = [];
  statutOptions: Statut[] = [Statut.EN_ATTENTE, Statut.EN_COURS, Statut.TERMINE]; // Use the Statut enum
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private livrableService: LivrableService) {}

  ngOnInit(): void {
    this.fetchAllLivrables();
  }

  fetchAllLivrables(): void {
    this.livrableService.getLivrables().subscribe({
      next: (data) => {
        this.livrables = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load livrables';
        console.error('Error fetching livrables:', error);
        this.isLoading = false;
      }
    });
  }

  updateStatus(livrable: Livrable, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    livrable.statut = selectElement.value as Statut; // Cast the value to Statut
    // Call the service to update the status in the backend
    this.livrableService.updateLivrable(livrable).subscribe({
      next: () => {
        console.log('Status updated successfully');
      },
      error: (error) => {
        console.error('Error updating status:', error);
        alert('Failed to update status.');
      }
    });
  }

  editLivrable(livrableId: number): void {
    // Navigate to edit page
  }

  deleteLivrable(livrableId: number): void {
    if (confirm('Are you sure you want to delete this livrable?')) {
      this.livrableService.deleteLivrable(livrableId).subscribe({
        next: () => {
          this.livrables = this.livrables.filter(l => l.id !== livrableId); // Remove from UI
        },
        error: (error) => {
          console.error('Error deleting livrable:', error);
          alert('Failed to delete livrable.');
        }
      });
    }
  }
}