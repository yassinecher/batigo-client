import { Component, OnInit } from '@angular/core';  // Ensure that Component and OnInit are imported
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from '../services/fournisseur.service';
import { Fournisseur } from '../models/fournisseur';  // Import Fournisseur interface

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.scss']
})
export class UpdateFournisseurComponent implements OnInit {
  fournisseur: Fournisseur = {  // Initialize as an empty object that adheres to the Fournisseur interface
    nom: '',
    adresse: '',
    email: '',
    tel: '',
    matricule: '',
    date_creation: new Date(),
    statut: ''
  };

  constructor(
    private fournisseurService: FournisseurService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!; 
    console.log(id);
    this.fournisseurService.getFournisseurById(id).subscribe((fournisseur: Fournisseur) => {
      this.fournisseur = fournisseur;  // Populate the form with fetched fournisseur data
    });
  }

  onSubmit(fournisseurForm: any): void {
    if (fournisseurForm.valid) {
      this.fournisseurService.updateFournisseur(this.fournisseur).subscribe(() => {
        alert('Fournisseur mis à jour avec succès');
        this.router.navigate(['/fournisseur/list']);  // Navigate to the list of fournisseurs
      });
    }
  }
}
