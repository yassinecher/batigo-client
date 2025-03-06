import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livrable } from 'src/app/Model/livrable.model';
import { LivrableService } from 'src/app/Service/Livrable/livrable.service';

interface ProjectGroup {
  projectName: string;
  livrables: Livrable[];
}

@Component({
  selector: 'app-viewlivrable',
  templateUrl: './viewlivrable.component.html',
  styleUrls: ['./viewlivrable.component.scss']
})
export class ViewlivrableComponent implements OnInit {
  livrables: Livrable[] = [];
  groupedLivrables: ProjectGroup[] = []; // <-- new array to hold groups
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
        this.groupedLivrables = this.groupByProject(this.livrables); // group them
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load livrables';
        console.error('Error fetching livrables:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Groups livrables by their associated project.
   * Returns an array of { projectName, livrables[] } objects.
   */
  private groupByProject(livrables: Livrable[]): ProjectGroup[] {
    const map = new Map<number, ProjectGroup>();

    for (const liv of livrables) {
      const project = liv.projet;
      if (!project) continue; // if there's no associated project, skip

      if (!map.has(project.id)) {
        map.set(project.id, {
          projectName: project.nom,
          livrables: []
        });
      }
      map.get(project.id)!.livrables.push(liv);
    }

    // Convert the map values to an array
    return Array.from(map.values());
  }

  editLivrable(livrableId: number): void {
    this.router.navigate([`/update-livrable/${livrableId}`]);
  }

  deleteLivrable(livrableId: number): void {
    if (confirm('Are you sure you want to delete this livrable?')) {
      this.livrableService.deleteLivrable(livrableId).subscribe({
        next: () => {
          // remove from both the livrables array and groupedLivrables
          this.livrables = this.livrables.filter(l => l.id !== livrableId);
          this.groupedLivrables = this.groupByProject(this.livrables);
        },
        error: (error) => {
          console.error('Error deleting livrable:', error);
          alert('Failed to delete livrable.');
        }
      });
    }
  }
}
