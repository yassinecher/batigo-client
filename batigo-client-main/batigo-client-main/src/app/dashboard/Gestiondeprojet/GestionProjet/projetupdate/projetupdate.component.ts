import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/Service/Projet/projet.service';
import { Etat, Projet } from 'src/app/Model/Projet';

@Component({
  selector: 'app-projetupdate',
  templateUrl: './projetupdate.component.html',
  styleUrls: ['./projetupdate.component.scss']
})
export class ProjetupdateComponent implements OnInit {
  projetForm!: FormGroup;
  etats = Object.values(Etat);
  projetId!: number;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projetId = +this.route.snapshot.paramMap.get('id')!;
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      etat: [Etat.EN_COURS, Validators.required]
    });

    this.projetService.obtenirProjetParId(this.projetId).subscribe(
      (projet: Projet) => {
        this.projetForm.patchValue(projet);
      },
      error => {
        console.error('Error fetching project', error);
      }
    );
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      const updatedProjet: Projet = this.projetForm.value;
      this.projetService.mettreAJourProjet(this.projetId, updatedProjet).subscribe(
        response => {
          console.log('Project updated successfully', response);
          this.router.navigate(['/projects']);
        },
        error => {
          console.error('Error updating project', error);
        }
      );
    }
  }
}