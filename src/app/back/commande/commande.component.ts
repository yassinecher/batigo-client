import { Component, OnInit } from '@angular/core';
import { CommandeService } from './commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  commandes: any[] = [];
  selectedCommande?: any;
  formCommande: any = {}; // Used for form binding when adding/editing a commande
  showForm: boolean = false; // Controls the form visibility

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getAllCommandes().subscribe(
      (data: any[]) => {
        this.commandes = data;
      },
      error => {
        console.error('Error loading commandes:', error);
      }
    );
  }

  // Toggle the form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
    this.selectedCommande = null; // Reset selection
    this.formCommande = {}; // Reset form
  }

  // Edit a commande
  editCommande(commande: any): void {
    this.selectedCommande = commande;
    this.formCommande = { ...commande }; // Copy data to avoid direct modification
    this.showForm = true;
  }

  // Submit form for add or update
  onSubmit(): void {
    console.log('Form Data:', this.formCommande);
    if (this.selectedCommande) {
      this.onUpdateCommande();
    } else {
      this.onAddCommande();
    }
  }
  
  

  // Add a new commande
  onAddCommande(): void {
    console.log('Adding Commande:', this.formCommande);
    this.commandeService.addCommande(this.formCommande).subscribe(
      (createdCommande: any) => {
        console.log('Commande Added:', createdCommande);
        this.commandes.push(createdCommande);
        this.cancelForm();
      },
      error => {
        console.error('Error adding commande:', error);
      }
    );
  }
  
  onUpdateCommande(): void {
    console.log('Updating Commande:', this.formCommande);
    this.commandeService.updateCommande(this.formCommande).subscribe(
      (updatedCommande: any) => {
        console.log('Commande Updated:', updatedCommande);
        const index = this.commandes.findIndex(c => c.idcommande === updatedCommande.idcommande);
        if (index !== -1) {
          this.commandes[index] = updatedCommande;
        }
        this.cancelForm();
      },
      error => {
        console.error('Error updating commande:', error);
      }
    );
  }
  

  // Delete a commande
  onDeleteCommande(id: number): void {
    this.commandeService.deleteCommande(id).subscribe(
      () => {
        this.commandes = this.commandes.filter(c => c.idcommande !== id);
      },
      error => {
        console.error('Error deleting commande:', error);
      }
    );
  }

  // Reset form and hide it
  cancelForm(): void {
    this.showForm = false;
    this.selectedCommande = null;
    this.formCommande = {};
  }
}
