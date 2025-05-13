import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InspectionsService } from 'src/app/Service/inspections.service';

@Component({
  selector: 'app-list-inspections',
  templateUrl: './list-inspections.component.html',
  styleUrls: ['./list-inspections.component.scss']
})
export class ListInspectionsComponent {

  incidentId!: number;
  inspections: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private inspectionsService: InspectionsService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'incident depuis l'URL
    this.incidentId = this.route.snapshot.params['id'];

    // Charger les inspections pour cet incident
    this.inspectionsService.getInspectionsByIncidentId(this.incidentId).subscribe((data) => {
      this.inspections = data;
      console.log(this.inspections);
    });
  }
  deleteInspection(inspectionId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette inspection ?')) {
      this.inspectionsService.deleteInspection(inspectionId).subscribe(
        () => {
          window.location.reload();  // Recharger la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'inspection:', error);
        }
      );
    }
  }

}
