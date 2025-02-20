import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrableService } from 'src/app/Service/Livrable/livrable.service';
import { Livrable, Statut } from 'src/app/Model/Livrable';

@Component({
  selector: 'app-updatelivrable',
  templateUrl: './updatelivrable.component.html',
  styleUrls: ['./updatelivrable.component.scss']
})
export class UpdatelivrableComponent implements OnInit {
  livrableForm!: FormGroup;
  statuts = Object.values(Statut);
  livrableId!: number;

  constructor(
    private fb: FormBuilder,
    private livrableService: LivrableService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livrableId = +this.route.snapshot.paramMap.get('id')!;
    this.livrableForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      statut: [Statut.EN_COURS, Validators.required],
      dateRemisePrevue: ['', Validators.required],
      dateRemiseReelle: ['', Validators.required],
      commentaire: ['', Validators.required],
      projetId: ['', [Validators.required, Validators.min(0)]]
    });

    this.livrableService.obtenirLivrableParId(this.livrableId).subscribe(
      (livrable: Livrable) => {
        this.livrableForm.patchValue(livrable);
      },
      error => {
        console.error('Error fetching livrable', error);
      }
    );
  }

  onSubmit(): void {
    if (this.livrableForm.valid) {
      const updatedLivrable: Livrable = this.livrableForm.value;
      this.livrableService.creerLivrable(updatedLivrable).subscribe(
        response => {
          console.log('Livrable updated successfully', response);
          this.router.navigate(['/livrables']);
        },
        error => {
          console.error('Error updating livrable', error);
        }
      );
    }
  }
}