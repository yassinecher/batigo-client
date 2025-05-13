import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/back/users/data-access/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isLoading: boolean = false;
  resetSuccess: boolean = false;
  resetError: string = '';
  token: string | null = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('resetToken'); // Get the token from the URL
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.passwordMatchValidator });
    if (!this.token) {
      this.resetError = 'Invalid token or token missing';
      return;
    }

  
   }

  ngOnInit(): void {
   
  }

  passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.valid && this.token) {
      this.isLoading = true;
      const { password } = this.resetPasswordForm.value;

      this.userService.resetPassword(this.token, password).subscribe(
        (response) => {
          this.isLoading = false;
          this.resetSuccess = true;
        },
        (error) => {
          this.isLoading = false;
           console.log(error)
          this.resetError = 'Failed to reset the password :'+error.error;
        }
      );
    }
  }
}