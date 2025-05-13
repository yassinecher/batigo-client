import { Component, OnInit } from '@angular/core';
import { Projet } from '../../model/projet.model';
import { ProjetService } from 'src/app/Service/projet.service';
import { ProjectService } from 'src/app/Service/project.service';

@Component({
  selector: 'app-projet-admin',
  templateUrl: './projet-admin.component.html',
  styleUrls: ['./projet-admin.component.scss']
})
export class ProjetAdminComponent implements OnInit {
  projets: Projet[] = [];
  loading = true;
  atRiskProjects: any[] = [];

  // Filtering properties
  searchTerm: string = '';
  selectedEtat: string = ''; // Empty string means all statuses

  // Local overrides stored in localStorage
  keptProjectIds: number[] = [];
  terminatedProjectIds: number[] = [];

  constructor(
    private projetService: ProjetService,
    private projectMonitoringService: ProjectService
  ) {}

  ngOnInit() {
    this.loadOverrides();
    this.loadAllProjects();
    this.projectMonitoringService.startMonitoring((atRisk) => {
      // Exclude projects that have been marked as kept locally
      this.atRiskProjects = atRisk.filter(risk => !this.keptProjectIds.includes(risk.project.id));
    });
  }

  ngOnDestroy(): void {
    this.projectMonitoringService.stopMonitoring();
  }

  loadAllProjects() {
    this.projetService.getAllProjets().subscribe({
      next: (data) => {
        this.projets = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.loading = false;
      }
    });
  }

  // Computed getter to filter projects based on searchTerm and selectedEtat
  get filteredProjets(): Projet[] {
    return this.projets.filter(projet => {
      let matchesSearch: boolean = true;
      let matchesEtat: boolean = true;
      if (this.searchTerm) {
        const search = this.searchTerm.toLowerCase();
        matchesSearch =
          (projet.nom ? projet.nom.toLowerCase().includes(search) : false) ||
          (projet.description ? projet.description.toLowerCase().includes(search) : false);
      }
      if (this.selectedEtat) {
        matchesEtat = projet.etat === this.selectedEtat;
      }
      return matchesSearch && matchesEtat;
    });
  }

  approveProjet(projet: Projet) {
    if (!projet.approved) {
      if (confirm('Are you sure you want to approve this project?')) {
        this.projetService.approveProjet(projet.id!).subscribe({
          next: () => {
            projet.approved = true;
            this.showSystemNotification(`Project "${projet.nom}" has been approved.`);
          },
          error: (err) => {
            console.error('Error approving project:', err);
          }
        });
      }
    }
  }

  terminateProjet(projet: Projet) {
    if (confirm(`Are you sure you want to TERMINATE project "${projet.nom}"? This action is irreversible.`)) {
      this.projetService.terminateProjet(projet.id!).subscribe({
        next: (proj) => {
          // Update the local project object based on the response.
          projet['terminated'] = true;
          // Optionally update local arrays (like terminatedProjectIds) if you use them.
          this.terminatedProjectIds.push(projet.id);
          this.saveOverrides();
          this.showSystemNotification(`Project "${projet.nom}" has been terminated.`);
        },
        error: (err) => {
          console.error('Error terminating project:', err);
          alert('Failed to terminate project.');
        }
      });
    }
  }
  
  keepProjet(projet: Projet) {
    if (!this.keptProjectIds.includes(projet.id)) {
      this.keptProjectIds.push(projet.id);
      this.saveOverrides();
    }
    this.atRiskProjects = this.atRiskProjects.filter(risk => risk.project.id !== projet.id);
    this.showSystemNotification(`Project "${projet.nom}" is kept. Please monitor and correct timelines.`);
  }

  isProjectAtRisk(projet: Projet): boolean {
    if (this.terminatedProjectIds.includes(projet.id)) {
      return false;
    }
    return this.atRiskProjects.some(risk => risk.project.id === projet.id);
  }

  private loadOverrides(): void {
    const kept = localStorage.getItem('keptProjectIds');
    const terminated = localStorage.getItem('terminatedProjectIds');
    this.keptProjectIds = kept ? JSON.parse(kept) : [];
    this.terminatedProjectIds = terminated ? JSON.parse(terminated) : [];
  }

  private saveOverrides(): void {
    localStorage.setItem('keptProjectIds', JSON.stringify(this.keptProjectIds));
    localStorage.setItem('terminatedProjectIds', JSON.stringify(this.terminatedProjectIds));
  }

  private showSystemNotification(message: string): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support system notifications.');
      return;
    }
    if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  }
}
