import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../users/data-access/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
   private userService: UserService

  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('resetToken') || '';
    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.mustMatch('password', 'confirmPassword') }
    );
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    if (this.resetForm.invalid || !this.token) return;

    const newPassword = this.resetForm.value.password;

    this.userService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.successMessage = 'Mot de passe réinitialisé avec succès.';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la réinitialisation du mot de passe.';
        this.successMessage = '';
      }
    });
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl) => {
      const pass = formGroup.get(password);
      const confirm = formGroup.get(confirmPassword);
      if (pass && confirm && pass.value !== confirm.value) {
        confirm.setErrors({ mustMatch: true });
      } else {
        confirm?.setErrors(null);
      }
    };
  }
}
