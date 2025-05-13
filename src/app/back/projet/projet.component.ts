import { Component } from '@angular/core';
import { Projet } from 'src/app/models/Projet';
import { ServiceFinance } from 'src/service/ServiceFinance';
 

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent {
  projets: Projet[] = [];  

  constructor(private serviceFinance: ServiceFinance) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets() {
    this.serviceFinance.getAll().subscribe((data: Projet[]) => {
      this.projets = data;  
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this projet?')) {
      this.serviceFinance.deleteProjet(id).subscribe({
        next: () => {
          console.log('Projet deleted successfully');
          this.projets = this.projets.filter(projet => projet.id !== id); 
        },
        error: (err) => {
          console.error('Error deleting projet:', err);
          alert('Failed to delete projet');
        }
      });
    }
  }
}
