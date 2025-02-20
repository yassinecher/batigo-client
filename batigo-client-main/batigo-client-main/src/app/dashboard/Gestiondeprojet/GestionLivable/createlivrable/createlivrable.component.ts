import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivrableService } from 'src/app/Service/Livrable/livrable.service';
import { Statut, Livrable } from 'src/app/Model/Livrable';

@Component({
  selector: 'app-createlivrable',
  templateUrl: './createlivrable.component.html',
  styleUrls: ['./createlivrable.component.scss']
})
export class CreatelivrableComponent implements OnInit {
  livrableForm!: FormGroup;
  statuts = Object.values(Statut);

  constructor(private fb: FormBuilder, private livrableService: LivrableService) {}

  ngOnInit(): void {
    this.livrableForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      statut: [Statut.EN_COURS, Validators.required],
      dateRemisePrevue: ['', Validators.required],
      dateRemiseReelle: [''],
      commentaire: [''],
      projetId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.livrableForm.valid) {
      const newLivrable: Livrable = this.livrableForm.value;
      this.livrableService.creerLivrable(newLivrable).subscribe(
        response => {
          console.log('Livrable created successfully', response);
          // Handle successful livrable creation (e.g., navigate to livrable list)
        },
        error => {
          console.error('Error creating livrable', error);
          // Handle error
        }
      );
    }
  }
}