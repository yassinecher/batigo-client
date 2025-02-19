import { Component } from '@angular/core';
import { AuthenticationService } from '../../data-access/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Login method
  login() {
    if (this.loginEmail && this.loginPassword) {
      this.authService.login(this.loginEmail, this.loginPassword).subscribe({
        next: (response) => {
          console.log('Logged in successfully', response);
          this.router.navigate(['/dashboard']); // Navigate to a dashboard or home page
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }

  // Register method
  register() {
    if (
      this.registerName &&
      this.registerEmail &&
      this.registerPassword &&
      this.registerPassword === this.registerConfirmPassword
    ) {
      this.authService.register(
        this.registerName,
        this.registerEmail,
        this.registerPassword
      ).subscribe({
        next: (response) => {
          console.log('Registered successfully', response);
          this.router.navigate(['/login']); // Redirect to login page
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    } else {
      console.error('Passwords do not match or fields are missing.');
    }
  }
}
