import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { FournisseurService } from '../../services/fournisseur.service';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss'],
})
export class FournisseurListComponent implements OnInit {
  fournisseurs: any[] = [];

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe((data: any[]) => {
      this.fournisseurs = data;
    });
  }

  deleteFournisseur(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This supplier will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fournisseurService.deleteFournisseur(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'The supplier has been deleted.', 'success');
            this.loadFournisseurs();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was a problem deleting the supplier.',
              'error'
            );
          }
        );
      }
    });
  }

  editFournisseur(id: number): void {
    this.router.navigate(['/dashboard/fournisseur/update', id]);
  }

  getContract(idF: number): void {
    window.open(`http://localhost:3000/contracts/contrat_${idF}.pdf`, '_blank');
  }

  generatePDF(): void {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yPosition = 20;

    // En-tête du PDF
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.text('Liste des Fournisseurs', 15, yPosition);
    pdf.setLineWidth(0.5);
    pdf.line(15, yPosition + 2, 195, yPosition + 2); // Ligne sous le titre
    yPosition += 10;

    // Parcourir la liste des fournisseurs et les afficher sous forme de cartes
    this.fournisseurs.forEach((fournisseur, index) => {
      if (yPosition > 270) {
        // Vérifier la hauteur pour éviter de dépasser la page
        pdf.addPage();
        yPosition = 20;
      }

      // Dessiner un rectangle comme une carte
      pdf.setFillColor(230, 230, 230); // Couleur de fond gris clair
      pdf.roundedRect(15, yPosition, 180, 35, 3, 3, 'F');

      // Informations du fournisseur
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(40, 40, 40);
      pdf.text(`Fournisseur ${index + 1}`, 20, yPosition + 8);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Nom: ${fournisseur.nom}`, 20, yPosition + 14);
      pdf.text(`Adresse: ${fournisseur.adresse}`, 20, yPosition + 20);
      pdf.text(`Email: ${fournisseur.email}`, 20, yPosition + 26);
      pdf.text(`Téléphone: ${fournisseur.tel}`, 20, yPosition + 32);
      pdf.text(`Matricule: ${fournisseur.matricule}`, 110, yPosition + 32);

      yPosition += 40; // Espacement entre les cartes
    });

    // Sauvegarde du fichier PDF
    pdf.save('Fournisseurs_List.pdf');
  }
}
