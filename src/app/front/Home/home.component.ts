import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/back/incident/data-access/incident.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
inc!:any;
  constructor(private Incident:IncidentService) { }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.Incident.getAllIncidents().subscribe((incidents) => {
      this.inc = incidents;
    });
  }
  deleteIncident(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet incident ?')) {
      this.Incident.deleteIncident(id).subscribe(() => {
        // Une fois l'incident supprimé, recharger la liste
        this.loadIncidents();
      });
    }
  }
}
