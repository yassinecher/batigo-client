import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/Service/Projet/projet.service';
import { Projet } from 'src/app/Model/Projet';

@Component({
  selector: 'app-projetlist',
  templateUrl: './projetlist.component.html',
  styleUrls: ['./projetlist.component.scss']
})
export class ProjetListComponent implements OnInit {
  projets: Projet[] = [];

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetService.listerProjets().subscribe(
      (data: Projet[]) => {
        this.projets = data;
      },
      error => {
        console.error('Error loading projects', error);
      }
    );
  }

  editProjet(id: number): void {
    // Navigate to the edit project form
    // Implement navigation logic here
  }

  deleteProjet(id: number): void {
    this.projetService.supprimerProjet(id).subscribe(
      () => {
        this.projets = this.projets.filter(projet => projet.id !== id);
      },
      error => {
        console.error('Error deleting project', error);
      }
    );
  }
}