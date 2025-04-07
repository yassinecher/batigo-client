import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FournisseurService } from '../../services/fournisseur.service';
import { Fournisseur } from '../../models/fournisseur';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {
  fournisseur: Fournisseur = {
    nom: '',
    adresse: '',
    email: '',
    tel: '',
    matricule: '',
     statut: 'actif',
    produits: []
  };

  fieldErrors: { [key: string]: string } = {
    nom: '',
    adresse: '',
    email: '',
    tel: '',
    matricule: '',
     statut: ''
  };

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validateForm(): boolean {
    let isValid = true;
    this.fieldErrors = { nom: '', adresse: '', email: '', tel: '', matricule: '', date_creation: '', statut: '' };

    if (!this.fournisseur.nom || this.fournisseur.nom.trim().length === 0) {
      this.fieldErrors['nom'] = 'Le nom est obligatoire.';
      isValid = false;
    }

    if (!this.fournisseur.adresse || this.fournisseur.adresse.trim().length === 0) {
      this.fieldErrors['adresse'] = 'L\'adresse est obligatoire.';
      isValid = false;
    }

    if (!this.fournisseur.email || this.fournisseur.email.trim().length === 0) {
      this.fieldErrors['email'] = 'L\'email est obligatoire.';
      isValid = false;
    }

    if (!this.fournisseur.tel || this.fournisseur.tel.trim().length === 0) {
      this.fieldErrors['tel'] = 'Le numéro de téléphone est obligatoire.';
      isValid = false;
    }

    if (!this.fournisseur.matricule || this.fournisseur.matricule.trim().length === 0) {
      this.fieldErrors['matricule'] = 'Le matricule est obligatoire.';
      isValid = false;
    }
 
    if (!this.fournisseur.statut) {
      this.fieldErrors['statut'] = 'Le statut est obligatoire.';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(fournisseurForm: NgForm) {
    if (this.validateForm()) {
      this.fournisseurService.addFournisseur(this.fournisseur).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Fournisseur ajouté',
            text: 'Le fournisseur a été ajouté avec succès.',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigate(['/fournisseur-list']);
          });

          fournisseurForm.resetForm();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du fournisseur.',
            confirmButtonText: 'Ok'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de validation',
        text: 'Veuillez corriger les erreurs du formulaire avant de soumettre.',
        confirmButtonText: 'Ok'
      });
    }
  }

  goBack() {
    this.router.navigate(['/fournisseur-list']);
  }
}
