import { Component, OnInit } from '@angular/core'; // Ensure that Component and OnInit are imported
import { ActivatedRoute, Router } from '@angular/router'; // Import Fournisseur interface
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Fournisseur } from '../model/fournisseur';
import { FournisseurService } from '../../services/fournisseur.service';

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.scss'],
})
export class UpdateFournisseurComponent implements OnInit {
  fournisseur: Fournisseur = {
    // Initialize as an empty object that adheres to the Fournisseur interface
    nom: '',
    adresse: '',
    email: '',
    tel: '',
    matricule: '',
    statut: '',
  };

  constructor(
    private fournisseurService: FournisseurService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log(id);
    this.fournisseurService
      .getFournisseurById(id)
      .subscribe((fournisseur: Fournisseur) => {
        this.fournisseur = fournisseur; // Populate the form with fetched fournisseur data
      });
  }

  onSubmit(fournisseurForm: any): void {
    if (fournisseurForm.valid) {
      this.fournisseurService
        .updateFournisseur(this.fournisseur)
        .subscribe(() => {
          Swal.fire({
            title: 'Succès!',
            text: 'Fournisseur mis à jour avec succès',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/fournisseur/list']); // Navigate to the list of fournisseurs
          });
        });
    }
  }
}
