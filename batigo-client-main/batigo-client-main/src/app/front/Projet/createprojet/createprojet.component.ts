import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etat, Projet } from 'src/app/Model/projet.model';
import { ProjetService } from 'src/app/Service/Projet/projet.service';

@Component({
  selector: 'app-createprojet',
  templateUrl: './createprojet.component.html',
  styleUrls: ['./createprojet.component.scss']
})
export class CreateprojetComponent {
  
  projetForm: FormGroup;
  etatOptions = Object.values(Etat); // Gets ENUM values
  showApprovalMessage = false;
  constructor(private fb: FormBuilder, private projetService: ProjetService, private router: Router) {
    this.projetForm = this.fb.group(
      {
        nom: ['', Validators.required],
        description: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFinPrevue: ['', Validators.required],
        budget: ['', [Validators.required, Validators.min(0)]],
        etat: [{ value: Etat.EN_COURS, disabled: true }], // Default & disabled
        responsable: ['', Validators.required]
      },
      { validators: this.dateValidation } // ✅ Apply custom validator at FormGroup level
    );
  }

  getControl(controlName: string): AbstractControl {
    return this.projetForm.get(controlName) as AbstractControl;
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const newProjet: Projet = {
        ...this.projetForm.getRawValue(), // Get values even if fields are disabled
        etat: Etat.EN_COURS // Ensure the value is set correctly
      };

      this.projetService.createProjet(newProjet).subscribe({
        next: () => {
          this.showApprovalMessage = true; // ✅ Show the message
          setTimeout(() => {
            this.router.navigate(['/projectlist']); // ✅ Redirect after a delay
          }, 3000); // 3-second delay
        },
        error: (err) => {
          console.error('Error creating project:', err);
          alert('Error creating project.');
        }
      });
    }
  }

dateValidation(group: AbstractControl): void {
  const dateDebut = group.get('dateDebut')?.value;
  const dateFinPrevue = group.get('dateFinPrevue')?.value;

  if (dateDebut && dateFinPrevue && new Date(dateDebut) > new Date(dateFinPrevue)) {
    group.get('dateFinPrevue')?.setErrors({ dateInvalid: true }); // ✅ Set error at field level
  } else {
    group.get('dateFinPrevue')?.setErrors(null); // ✅ Clear error when valid
  }
}

}
