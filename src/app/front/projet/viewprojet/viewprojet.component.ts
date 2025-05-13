import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Etat, Projet } from 'src/app/back/model/projet.model';
import { ProjetService } from 'src/app/Service/projet.service';

@Component({
  selector: 'app-viewprojet',
  templateUrl: './viewprojet.component.html',
  styleUrls: ['./viewprojet.component.scss']
})
export class ViewprojetComponent  implements OnInit {
  projets: Projet[] = [];
  archivedProjets: Projet[] = [];
  loading = true;
  showArchived = false;

  // Pagination properties
  activePage: number = 1;
  archivedPage: number = 1;
  itemsPerPage: number = 3;

  // Filter properties
  filterName: string = '';
  filterEtat: string = '';

  // New FormControl for automatic search by project name
  searchControl: FormControl = new FormControl();

  constructor(private projetService: ProjetService) {}

  ngOnInit() {
    this.loadApprovedProjects();

    // Subscribe to changes on the searchControl to perform an automatic search
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after the last keystroke
        distinctUntilChanged() // Only proceed if the value has changed
      )
      .subscribe((value: string) => {
        if (value && value.trim() !== '') {
          this.loading = true;
          this.loadProjetByName(value);
        } else {
          this.loadApprovedProjects();
        }
      });
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

// New method to get projects by name
loadProjetByName(name: string) {
  this.projetService.getProjetByName(name).subscribe({
    next: (data) => {
      this.projets = data; // data is now an array
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading project by name:', err);
      this.projets = [];
      this.loading = false;
    }
  });
}


  // New method to get projects by state (etat)
  loadProjetsByEtat(etat: string) {
    this.projetService.getProjetByEtat(etat).subscribe({
      next: (data) => {
        this.projets = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading projects by state:', err);
        this.loading = false;
      }
    });
  }


  updateProgress(projet: Projet, progress: number) {
    if (progress < projet.progress) {
      alert("You cannot decrease the progress!");
      return;
    }
  
    this.projetService.updateProjetProgress(projet.id!, progress).subscribe({
      next: (updatedProjet) => {
        projet.progress = updatedProjet.progress;
  
        // ✅ If progress reaches 100%, mark as complete and archive
        if (updatedProjet.progress === 100) {
          projet.etat = Etat.TERMINE;
          this.projetService.updateProjet(projet).subscribe({
            next: () => {
              this.projetService.archiveProjet(projet.id!).subscribe({
                next: () => console.log(`Project ${projet.nom} has been archived.`),
                error: (err) => console.error("Error archiving project:", err)
              });
  
              this.loadApprovedProjects();
            },
            error: (err) => console.error("Error updating project status:", err)
          });
        } else {
          this.loadApprovedProjects();
        }
      },
      error: (err) => {
        console.error("Error updating progress:", err);
      }
    });
  }
  
  
}