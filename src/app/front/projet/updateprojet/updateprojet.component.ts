import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etat, Projet } from 'src/app/back/model/projet.model';
import { ProjetService } from 'src/app/Service/projet.service';

@Component({
  selector: 'app-updateprojet',
  templateUrl: './updateprojet.component.html',
  styleUrls: ['./updateprojet.component.scss']
})
export class UpdateprojetComponent {
  projetForm: FormGroup;
  projetId!: number;
  etatOptions = Object.values(Etat);
  loading = true;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      etat: ['', Validators.required],
      responsable: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.projetId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projetId) {
      this.loadProjet();
      
    }
  }

  loadProjet() {
    this.projetService.getProjetById(this.projetId).subscribe({
      next: (projet) => {
        this.projetForm.patchValue(projet);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.loading = false;
      }
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.projetForm.get(controlName) as AbstractControl;
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const updatedProjet: Projet = {
        id: this.projetId,
        ...this.projetForm.value
      };

      this.projetService.updateProjet(updatedProjet).subscribe({
        next: () => {
          alert('Project updated successfully!');
          this.router.navigate(['/projectlist']);
        },
        error: (err) => {
          console.error('Error updating project:', err);
          alert('Error updating project.');
        }
      });
    }
  }
}
