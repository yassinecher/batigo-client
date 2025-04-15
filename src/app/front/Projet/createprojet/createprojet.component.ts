import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  etatOptions = Object.values(Etat);
  showApprovalMessage = false;

  constructor(private fb: FormBuilder, private projetService: ProjetService, private router: Router) {
    this.projetForm = this.fb.group(
      {
        nom: ['', Validators.required],
        description: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFinPrevue: ['', Validators.required],
        budget: ['', [Validators.required, Validators.min(0)]],
        etat: [{ value: Etat.EN_COURS, disabled: true }],
        responsable: ['', Validators.required]
      },
      { validators: this.dateValidation }
    );
  }

  getControl(controlName: string): AbstractControl {
    return this.projetForm.get(controlName) as AbstractControl;
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const newProjet: Projet = {
        ...this.projetForm.getRawValue(),
        etat: Etat.EN_COURS // Ensure the value is set correctly
      };

      this.projetService.createProjet(newProjet).subscribe({
        next: () => {
          
          this.showSystemNotification('Waiting for project approval. You will be notified when it\'s done.');

          this.showApprovalMessage = true;

          setTimeout(() => {
            this.router.navigate(['/projectlist']);
          }, 3000); // Redirect after 3 seconds
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
      group.get('dateFinPrevue')?.setErrors({ dateInvalid: true });
    } else {
      group.get('dateFinPrevue')?.setErrors(null);
    }
  }

  /**
   * Shows a native system-level notification using the HTML5 Notifications API.
   */
  private showSystemNotification(message: string): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support system notifications.');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  }
}
