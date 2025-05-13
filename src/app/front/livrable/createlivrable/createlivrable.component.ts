import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Statut } from 'src/app/back/model/livrable.model';
import { LivrableService } from 'src/app/Service/livrable.service';

@Component({
  selector: 'app-createlivrable',
  templateUrl: './createlivrable.component.html',
  styleUrls: ['./createlivrable.component.scss']
})
export class CreatelivrableComponent implements OnInit {
  livrableForm: FormGroup;
  statutOptions = Object.values(Statut);
  projetId!: number;

  constructor(
    private fb: FormBuilder,
    private livrableService: LivrableService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.livrableForm = this.fb.group(
      {
        nom: ['', Validators.required],
        type: ['', Validators.required],
        statut: [Statut.EN_COURS, Validators.required],
        dateRemisePrevue: ['', Validators.required],
        dateRemiseReelle: [''],
        commentaire: ['']
      },
      { validators: livrableDateValidation } 
    );
  }

  ngOnInit() {
    this.projetId = Number(this.route.snapshot.paramMap.get('projetId'));
  }

  onSubmit() {
    if (this.livrableForm.valid) {
      const newLivrable = {
        nom: this.livrableForm.value.nom,
        type: this.livrableForm.value.type,
        statut: this.livrableForm.value.statut,
        dateRemisePrevue: this.livrableForm.value.dateRemisePrevue,
        dateRemiseReelle: this.livrableForm.value.dateRemiseReelle || null,
        commentaire: this.livrableForm.value.commentaire || '',
        projetId: this.projetId 
      };

      console.log('Sending Livrable:', newLivrable); 

      this.livrableService.createLivrable(newLivrable).subscribe(() => {
        alert('Livrable added successfully!');
        this.router.navigate([`/projets`]); // Redirect back to project list
      });
    }
  }
}


export function livrableDateValidation(group: AbstractControl): ValidationErrors | null {
  const dateRemisePrevue = group.get('dateRemisePrevue')?.value;
  const dateRemiseReelle = group.get('dateRemiseReelle')?.value;

  if (dateRemisePrevue && dateRemiseReelle && new Date(dateRemisePrevue) > new Date(dateRemiseReelle)) {
    group.get('dateRemiseReelle')?.setErrors({ dateInvalid: true }); 
    return { dateInvalid: true };
  } else {
    group.get('dateRemiseReelle')?.setErrors(null); 
    return null;
  }
}
