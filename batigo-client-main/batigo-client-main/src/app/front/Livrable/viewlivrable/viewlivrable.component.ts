import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livrable } from 'src/app/Model/livrable.model';
import { LivrableService } from 'src/app/Service/Livrable/livrable.service';

@Component({
  selector: 'app-viewlivrable',
  templateUrl: './viewlivrable.component.html',
  styleUrls: ['./viewlivrable.component.scss']
})
export class ViewlivrableComponent {
  livrables: Livrable[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private livrableService: LivrableService, private router: Router) {}

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

  editLivrable(livrableId: number): void {
    this.router.navigate([`/update-livrable/${livrableId}`]); // Navigate to edit page
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
