import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/Model/projet.model';
import { ProjetService } from 'src/app/Service/Projet/projet.service';

@Component({
  selector: 'app-viewprojet',
  templateUrl: './viewprojet.component.html',
  styleUrls: ['./viewprojet.component.scss']
})
export class ViewprojetComponent implements OnInit {
  projets: Projet[] = [];
  archivedProjets: Projet[] = [];
  loading = true;
  showArchived = false;

   // Pagination properties
   activePage: number = 1;
   archivedPage: number = 1;
   itemsPerPage: number = 3;
  constructor(private projetService: ProjetService) {}

  ngOnInit() {
    this.loadApprovedProjects();
  }

  downloadPdf(projectId: number, projectName: string) {
    this.projetService.downloadProjetPdf(projectId).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName}_Report.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading PDF:', err);
      }
    });
  }

  loadApprovedProjects() {
    this.projetService.getApprovedProjets().subscribe({
      next: (data) => {
        this.projets = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading approved projects:', err);
        this.loading = false;
      }
    });
  }

  loadArchivedProjects() {
    this.projetService.getArchivedProjets().subscribe({
      next: (data) => {
        this.archivedProjets = data;
        this.showArchived = true;
      },
      error: (err) => {
        console.error('Error loading archived projects:', err);
      }
    });
  }

  archiveProjet(projectId: number) {
    if (confirm('Are you sure you want to archive this project?')) {
      this.projetService.archiveProjet(projectId).subscribe({
        next: () => {
          alert('Project archived successfully!');
          this.loadApprovedProjects(); // Reload only approved projects list
        },
        error: (err) => {
          console.error('Error archiving project:', err);
        }
      });
    }
  }

  unarchiveProjet(projectId: number) {
    if (confirm('Are you sure you want to unarchive this project?')) {
      this.projetService.unarchiveProjet(projectId).subscribe({
        next: () => {
          alert('Project unarchived successfully!');
          this.loadArchivedProjects(); // Reload archived projects list
        },
        error: (err) => {
          console.error('Error unarchiving project:', err);
        }
      });
    }
  }

  toggleArchivedView() {
    if (!this.showArchived) {
      this.loadArchivedProjects();
    } else {
      this.showArchived = false;
    }
  }
}
