import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrableService } from 'src/app/Service/Livrable/livrable.service';

@Component({
  selector: 'app-updatelivrable',
  templateUrl: './updatelivrable.component.html',
  styleUrls: ['./updatelivrable.component.scss']
})
export class UpdatelivrableComponent {
  livrableForm: FormGroup;
  livrableId!: number;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private livrableService: LivrableService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.livrableForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      statut: ['', Validators.required],
      dateRemisePrevue: ['', Validators.required],
      dateRemiseReelle: [''],
      commentaire: ['']
    });
  }

  ngOnInit(): void {
    this.livrableId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.livrableId) {
      this.errorMessage = 'Invalid Livrable ID';
      this.isLoading = false;
      return;
    }

    this.livrableService.getLivrableById(this.livrableId).subscribe({
      next: (livrable) => {
        this.livrableForm.patchValue(livrable);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch livrable details';
        console.error('Error fetching livrable:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.livrableForm.valid) {
      this.livrableService.updateLivrable({ id: this.livrableId, ...this.livrableForm.value }).subscribe({
        next: () => {
          alert('Livrable updated successfully!');
          this.router.navigate(['/view-livrables']);
        },
        error: (error) => {
          console.error('Error updating livrable:', error);
          alert('Failed to update livrable.');
        }
      });
    }
  }
}
