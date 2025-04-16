import { Component } from '@angular/core';
import { IncidentService } from './data-access/incident.service'; // Adjust the path as necessary

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent {
  incidents: any[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.loadIncidents();
  }
  chatbotVisible = false; // L'état initial est caché

  toggleChatbot() {
    this.chatbotVisible = !this.chatbotVisible; // Alterne l'état d'affichage du chatbot
  }
loadIncidents(): void {
  this.incidentService.getAllIncidents().subscribe((data) => {
    // Trier les incidents pour afficher ceux dont la date est supérieure à 3 jours en premier
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    this.incidents = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Si a est plus vieux que 3 jours et b ne l'est pas, a doit venir avant
      if (dateA < threeDaysAgo && dateB >= threeDaysAgo) {
        return -1;
      }
      // Si b est plus vieux que 3 jours et a ne l'est pas, b doit venir avant
      if (dateB < threeDaysAgo && dateA >= threeDaysAgo) {
        return 1;
      }
      // Si les deux ont la même condition (plus vieux ou plus récents), on les trie par date
      return dateB.getTime() - dateA.getTime(); // Afficher les plus anciens d'abord
    });
  });
}


  deleteIncident(id: number): void {
    this.incidentService.deleteIncident(id).subscribe(() => {
      this.loadIncidents(); 
    });
  }
}
