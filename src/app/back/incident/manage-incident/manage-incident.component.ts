import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from 'src/app/Service/incident.service';

@Component({
  selector: 'app-manage-incident',
  templateUrl: './manage-incident.component.html',
  styleUrls: ['./manage-incident.component.scss']
})
export class ManageIncidentComponent implements OnInit {

  manageIncidentForm!: FormGroup;
  incidentId: number = 0;  // Store the incident ID
  incident: any = {        // Store the incident data
    titre: '',
    description: '',
    date: '',
    gravite: '',
    etat: '',
    responsable: ''
  };

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.manageIncidentForm = this.fb.group({
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      gravite: ['', [Validators.required]], 
      etat: ['', [Validators.required]],
      responsable: ['', [Validators.required]]
    });

    // Get the incident ID from the route
    this.incidentId = +this.route.snapshot.paramMap.get('id')!;  // Use '+' to convert string to number

    // Fetch the incident data from the service
    this.incidentService.getIncidentById(this.incidentId).subscribe(
      (incident) => {
        this.incident = incident;
        // Populate the form with the fetched incident data
        this.manageIncidentForm.patchValue(this.incident);
      },
      (error) => {
        console.error('Error fetching incident data', error);
        alert('Erreur lors de la récupération des données de l\'incident');
      }
    );
  }

  // Submit method to update the incident
  onSubmit(): void {
    if (this.manageIncidentForm.valid) {
      const updatedIncident: any = this.manageIncidentForm.value;
      updatedIncident.id = this.incidentId;  // Ensure the incident ID is included

      // Call the service to update the incident using the `updateIncident` method
      this.incidentService.updateIncident(this.incidentId, updatedIncident).subscribe(
        (response) => {
          console.log('Incident mis à jour avec succès', response);
          // Redirect to the incidents list page
          this.router.navigate(['/incident']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'incident', error);
          alert('Une erreur est survenue lors de la mise à jour de l\'incident');
        }
      );
    }
  }

  // Get form controls
  get f() {
    return this.manageIncidentForm.controls;
  }

  // Go back to the incidents list
  backToList(): void {
    this.router.navigate(['/incident']);
  }
}
