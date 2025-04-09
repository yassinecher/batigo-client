import { Component, ElementRef, ViewChild } from '@angular/core';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  produits: Produit[] = [];
  openForm: boolean = false;
  currentPage = 0;
  totalPages = 0;
  pageSize = 5;
  searchTerm = '';
  totalItems = 0;
  selectedProduct: Produit | null = null;
  constructor(private produitsService: ProduitService) {}
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  ngOnInit(): void {
    this.loadProduits();
  }
  switchOpenFormValue() {
    this.openForm = !this.openForm;
  }
  loadProduits(): void {
    this.produitsService
      .getPaginatedProduits(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe((response) => {
        this.produits = response.content;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalElements;
      });
  }

  deleteProduit(id: number): void {
    this.produitsService.deleteProduit(id).subscribe(() => {
      this.loadProduits();
    });
  }
  onFormSubmitted(): void {
    this.switchOpenFormValue();
    this.loadProduits();
  }
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProduits();
    }
  }
  get pageSizeOptions(): number[] {
    const options = new Set<number>();

    if (this.totalItems < 5) {
      options.add(this.totalItems);
    } else if (this.totalItems < 10) {
      options.add(5);
      options.add(this.totalItems);
    } else {
      options.add(5);
      options.add(10);
      options.add(this.totalItems);
    }

    return Array.from(options).sort((a, b) => a - b);
  }
  onPageSizeChange(): void {
    this.currentPage = 0; // reset to first page
    this.loadProduits();
  }
  changeSelectProduit(produit: Produit) {
    this.selectedProduct = produit;
    this.switchOpenFormValue();
  }
  downloadAsPDF(): void {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Title for PDF
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.text('Liste des Produits', 15, 15);

    // Table headers
    const headers = [
      ['ID', 'Nom', 'Description', 'Référence', 'Categorie', 'Fournisseur'],
    ];

    // Table data (body)
    const data = this.produits.map((produit) => [
      produit.id ?? '', // Replace undefined with empty string
      produit.nomP ?? '', // Replace undefined with empty string
      produit.description ?? '', // Replace undefined with empty string
      produit.reference ?? '', // Replace undefined with empty string
      produit?.categorie?.nom ?? '', // Replace undefined with empty string
      produit?.fournisseur?.nom ?? '', // Replace undefined with empty string,
    ]);

    // Adding the table with autoTable
    autoTable(pdf, {
      head: headers,
      body: data,
      startY: 20, // Starting Y position for the table
      margin: { top: 10, left: 15, right: 15, bottom: 10 }, // Add margins for better spacing
      styles: {
        cellPadding: 3,
        fontSize: 10,
        halign: 'center', // Center align the content of cells
      },
      headStyles: {
        fillColor: [100, 100, 255], // Blue color for header row
        textColor: [255, 255, 255], // White text color in header row
      },
      bodyStyles: {
        lineWidth: 0.1,
        lineColor: [200, 200, 200], // Light gray borders for body rows
      },
      didDrawPage: (data: any) => {
        // Additional customization for the page layout if needed
        if (data.cursor.y > 270) {
          pdf.addPage();
          data.cursor.y = 20; // Reset position after page break
        }
      },
    });

    // Save the PDF document
    pdf.save('ListeProduit.pdf');
  }
  downloadAsExcel(): void {
    // Prepare the data
    const data = this.produits.map((produit) => ({
      ID: produit.id ?? '',
      Nom: produit.nomP ?? '',
      Description: produit.description ?? '',
      Référence: produit.reference ?? '',
      Categorie: produit?.categorie?.nom ?? '',
      Fournisseur: produit?.fournisseur?.nom ?? '',
    }));

    // Create a worksheet from the data
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produits'); // Add the worksheet to the workbook

    // Generate and download the Excel file
    XLSX.writeFile(wb, 'ListeProduits.xlsx');
  }
}
