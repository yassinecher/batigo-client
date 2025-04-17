import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Projet } from 'src/app/models/Projet';  
import { ServiceFinance } from 'src/service/ServiceFinance';

@Component({
  selector: 'app-new-projet',
  templateUrl: './new-projet.component.html',
  styleUrls: ['./new-projet.component.scss']
})
export class NewProjetComponent {
  projetForm: FormGroup;
  projets: Projet[] = [];

  constructor(
    private serviceFinance: ServiceFinance,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer tous les comptes à l'initialisation du composant
    this.serviceFinance.getAll().subscribe((data: Projet[]) => {
      this.projets = data;
    });

     
    this.projetForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],   
      adresse: ['', [Validators.required]],  
      type: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      console.log("Form Values Sent to Backend:", this.projetForm.value);  
      
      const newProjet: Projet = this.projetForm.value;
      this.serviceFinance.add(newProjet).subscribe((response) => {
        console.log('Backend Response:', response); 
        this.projets.push(response);
        this.projetForm.reset();
        this.router.navigate(['/dashboard/projets']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}