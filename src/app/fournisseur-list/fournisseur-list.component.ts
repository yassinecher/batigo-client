import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../services/fournisseur.service';  // Ensure this import path is correct
import { Router } from '@angular/router'; // For navigation
import Swal from 'sweetalert2';  // SweetAlert2 for pop-ups

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {
  fournisseurs: any[] = [];

  constructor(private fournisseurService: FournisseurService, private router: Router) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe((data: any[]) => {
      this.fournisseurs = data;
    });
  }

  deleteFournisseur(id: number): void {
    // Confirmation pop-up with SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'This supplier will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fournisseurService.deleteFournisseur(id).subscribe(() => {
          // Success message after deletion
          Swal.fire(
            'Deleted!',
            'The supplier has been deleted.',
            'success'
          );
          // Reload the list after deletion
          this.loadFournisseurs();
        }, error => {
          // Error message in case of failure
          Swal.fire(
            'Error!',
            'There was a problem deleting the supplier.',
            'error'
          );
        });
      }
    });
  }

  editFournisseur(id: number): void {
    // Navigate to the update-fournisseur component with the id of the selected fournisseur
    this.router.navigate(['/fournisseur/update', id]);
  }
  getContract(idF: number): void {
    window.open(`http://localhost:3000/contracts/contrat_${idF}.pdf`, '_blank');
  }
  
}
