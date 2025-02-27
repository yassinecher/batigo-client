import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/Model/projet.model';
import { ProjetService } from 'src/app/Service/Projet/projet.service';

@Component({
  selector: 'app-admin-approve',
  templateUrl: './admin-approve.component.html',
  styleUrls: ['./admin-approve.component.scss']
})
export class AdminApproveComponent implements OnInit {
  projets: Projet[] = [];
  loading = true;

  constructor(private projetService: ProjetService) {}

  ngOnInit() {
    this.loadAllProjects(); // ✅ Load all projects including approved and pending
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

  approveProjet(projet: Projet) {
    if (!projet.approved) {
      if (confirm('Are you sure you want to approve this project?')) {
        this.projetService.approveProjet(projet.id!).subscribe({
          next: () => {
            projet.approved = true; // ✅ Update UI to reflect approval
          },
          error: (err) => {
            console.error('Error approving project:', err);
          }
        });
      }
    }
  }
}
