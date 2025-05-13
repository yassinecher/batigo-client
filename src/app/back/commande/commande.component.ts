import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit,OnChanges {
  commandes: any[] = []; // Full list of commandes
  filteredCommandes: any[] = []; // Filtered list of commandes for display
  selectedCommande?: any; // Currently selected commande for editing
  formCommande: any = {}; // Used for form binding when adding/editing a commande
  showForm: boolean = false; // Controls the form visibility

  // Sorting
  sortColumn: string = ''; // Currently sorted column
  sortDirection: string = 'asc'; // Sorting direction (asc or desc)

  // Search
  searchTerm: string = ''; // Search term for filtering commandes

  // Notifications
  message: string = ''; // Notification message
  messageType: 'success' | 'error' | '' = ''; // Type of notification (success/error)

  // Date
  minDate: string = ''; // Minimum date for the date picker

  // Loading state
  isLoading: boolean = false; // Indicates if data is being loaded

  // Pagination
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page
  totalPages: number = 1; // Total number of pages

  // Advanced Filters
  selectedStatus: string = ''; // Selected status for filtering
  startDate: string = ''; // Start date for date range filter
  endDate: string = ''; // End date for date range filter
  selectedPriority: string = ''; // Selected priority for filtering

  // Bulk Actions
  bulkSelectAll: boolean = false; // Toggle for selecting all commandes

  // Undo/Redo
  public actionStack: any[] = []; // Stack to store actions for undo
  public undoneStack: any[] = []; // Stack to store undone actions for redo

  // Statistics
  commandeStatistics: any = {}; // Stores statistics about commandes
  totalCommandesCount: number = 0; // Stores the total number of commandes

  constructor(private commandeService: CommandeService) {
    this.loadCommandesCount(); // Load total commandes count

   }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadCommandesCount(); // Load total commandes count
  }

  ngOnInit(): void {
    this.loadCommandes();
    this.setMinDate(); // Set the minimum date for the date picker
    this.loadCommandeStatistics(); // Load commande statistics
  }

  // Set the minimum date for the date picker
  setMinDate(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  // Load all commandes from the service
  loadCommandes(): void {
    this.isLoading = true;
    this.commandeService.getAllCommandes().subscribe(
      (data: any[]) => {
        this.commandes = data.map(c => ({ ...c, selected: false })); // Initialize selection state
        this.filteredCommandes = [...this.commandes]; // Initialize filteredCommandes
        this.updateTotalPages(); // Update pagination
        this.isLoading = false;
      },
      (error: any) => { // Explicitly type the error parameter
        console.error('Error loading commandes:', error);
        this.showMessage('Error loading commandes', 'error');
        this.isLoading = false;
      }
    );
  }

  // Load commande statistics
  loadCommandeStatistics(): void {
    this.commandeService.getCommandeStatistics().subscribe(
      (data: any) => {
        this.commandeStatistics = data;
      },
      (error: any) => { // Explicitly type the error parameter
        console.error('Error loading commande statistics:', error);
        this.showMessage('Error loading commande statistics', 'error');
      }
    );
  }

  // Load total commandes count
  loadCommandesCount(): void {
    this.commandeService.getCommandesCount().subscribe(
      (data: any) => {
        this.totalCommandesCount = data;
      },
      (error: any) => { // Explicitly type the error parameter
        console.error('Error loading commandes count:', error);
        this.showMessage('Error loading commandes count', 'error');
      }
    );
  }

  // Filter commandes by priority
  filterCommandesByPriority(): void {
    if (!this.selectedPriority) {
      this.filteredCommandes = [...this.commandes];
    } else {
      this.commandeService.getCommandesByPriority(this.selectedPriority).subscribe(
        (data: any[]) => {
          this.filteredCommandes = data;
          this.updateTotalPages();
        },
        (error: any) => { // Explicitly type the error parameter
          console.error('Error filtering commandes by priority:', error);
          this.showMessage('Error filtering commandes by priority', 'error');
        }
      );
    }
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
  onSubmit(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.invalid) { // Check if form is invalid
      this.showMessage('Please fill all required fields', 'error');
      return; // Prevent submission if invalid
    }

    if (this.selectedCommande) {
      this.onUpdateCommande();
    } else {
      this.onAddCommande();
    }
  }

  // Add a new commande
  onAddCommande(): void {
    this.commandeService.addCommande(this.formCommande).subscribe(
      (createdCommande: any) => {
        this.commandes.push(createdCommande);
        this.filteredCommandes = [...this.commandes]; // Update filtered list
        this.updateTotalPages(); // Update pagination
        this.showMessage('Commande added successfully!', 'success');
        this.cancelForm();
      },
      (error: any) => { // Explicitly type the error parameter
        console.error('Error adding commande:', error);
        this.showMessage('Error adding commande', 'error');
      }
    );
  }

  // Update an existing commande
  onUpdateCommande(): void {
    this.commandeService.updateCommande(this.formCommande).subscribe(
      (updatedCommande: any) => {
        const index = this.commandes.findIndex(c => c.idcommande === updatedCommande.idcommande);
        if (index !== -1) {
          this.commandes[index] = updatedCommande;
          this.filteredCommandes = [...this.commandes]; // Update filtered list
        }
        this.showMessage('Commande updated successfully!', 'success');
        this.cancelForm();
      },
      (error: any) => { // Explicitly type the error parameter
        console.error('Error updating commande:', error);
        this.showMessage('Error updating commande', 'error');
      }
    );
  }

  // Delete a commande
  onDeleteCommande(id: number): void {
    const deletedCommande = this.commandes.find(c => c.idcommande === id);
    this.actionStack.push({ type: 'delete', data: deletedCommande }); // Store action for undo

    if (confirm('Are you sure you want to delete this commande?')) {
      this.commandeService.deleteCommande(id).subscribe(
        () => {
          this.commandes = this.commandes.filter(c => c.idcommande !== id);
          this.filteredCommandes = [...this.commandes]; // Update filtered list
          this.updateTotalPages(); // Update pagination
          this.showMessage('Commande deleted successfully!', 'success');
        },
        (error: any) => { // Explicitly type the error parameter
          console.error('Error deleting commande:', error);
          this.showMessage('Error deleting commande', 'error');
        }
      );
    }
  }

  // Undo the last action
  undo(): void {
    const lastAction = this.actionStack.pop();
    if (lastAction?.type === 'delete') {
      this.commandes.push(lastAction.data);
      this.filteredCommandes = [...this.commandes];
      this.undoneStack.push(lastAction); // Store undone action for redo
      this.showMessage('Undo successful: Commande restored', 'success');
    }
  }

  // Redo the last undone action
  redo(): void {
    const lastUndone = this.undoneStack.pop();
    if (lastUndone?.type === 'delete') {
      this.commandes = this.commandes.filter(c => c.idcommande !== lastUndone.data.idcommande);
      this.filteredCommandes = [...this.commandes];
      this.actionStack.push(lastUndone); // Store action for undo
      this.showMessage('Redo successful: Commande deleted', 'success');
    }
  }

  // Reset form and hide it
  cancelForm(): void {
    this.showForm = false;
    this.selectedCommande = null;
    this.formCommande = {};
  }

  // Filter commandes based on search term
  filterCommandes(): void {
    if (!this.searchTerm) {
      this.filteredCommandes = [...this.commandes];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCommandes = this.commandes.filter(c =>
        c.details.toLowerCase().includes(term) ||
        c.status.toLowerCase().includes(term)
      );
    }
    this.updateTotalPages(); // Update pagination
    this.currentPage = 1; // Reset to first page after filtering
  }

  // Clear search term and reset filtered list
  clearSearch(): void {
    this.searchTerm = '';
    this.filterCommandes();
  }

  // Apply advanced filters
  applyAdvancedFilters(): void {
    this.filteredCommandes = this.commandes.filter(c => {
      const matchesStatus = !this.selectedStatus || c.status === this.selectedStatus;
      const matchesDateRange = (!this.startDate || new Date(c.orderdate) >= new Date(this.startDate)) &&
                              (!this.endDate || new Date(c.orderdate) <= new Date(this.endDate));
      return matchesStatus && matchesDateRange;
    });
    this.updateTotalPages();
    this.currentPage = 1;
  }

  // Clear all filters
  clearAllFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedPriority = '';
    this.filterCommandes();
  }

  // Bulk select/deselect all commandes
  toggleBulkSelection(): void {
    this.bulkSelectAll = !this.bulkSelectAll;
    this.commandes.forEach(c => c.selected = this.bulkSelectAll);
    this.filteredCommandes.forEach(c => c.selected = this.bulkSelectAll);
  }

  // Delete selected commandes
  deleteSelected(): void {
    const selectedCommandes = this.commandes.filter(c => c.selected);
    if (selectedCommandes.length === 0) {
      this.showMessage('No commandes selected', 'error');
      return;
    }

    if (confirm(`Delete ${selectedCommandes.length} selected commandes?`)) {
      selectedCommandes.forEach(c => {
        this.commandeService.deleteCommande(c.idcommande).subscribe({
          next: () => {
            this.commandes = this.commandes.filter(commande => commande.idcommande !== c.idcommande);
          },
          error: (err: any) => { // Explicitly type the error parameter
            console.error('Error deleting commande:', err);
            this.showMessage(`Error deleting commande ${c.idcommande}`, 'error');
          }
        });
      });

      this.filteredCommandes = this.filteredCommandes.filter(c => !c.selected);
      this.showMessage(`${selectedCommandes.length} commandes deleted`, 'success');
      this.updateTotalPages();
    }
  }

  // Sort commandes by column
  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredCommandes.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'object' && typeof valueB === 'object') {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
  }

  // Show notification message
  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000); // Hide message after 3 seconds
  }

  // Speak text using browser speech synthesis
  speak(text: string): void {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    synth.speak(utterance);
  }

  // Mark all form controls as touched
  markFormTouched(form: NgForm): void {
    if (!form) return;
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Export commandes to CSV
  exportToCSV(): void {
    const headers = ['Details', 'Order Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...this.filteredCommandes.map(c => `${c.details},${c.orderdate},${c.status}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'commandes.csv';
    link.click();
  }

  // Pagination methods
  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredCommandes.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getPaginatedCommandes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCommandes.slice(startIndex, endIndex);
  }
}