import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../data-access/authentication.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../../Shared/error-modal/error-modal.component';
import { SuccessModalComponent } from '../../Shared/success-modal/success-modal.component';
import { UserService } from '../../../back/users/data-access/user.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,  private modalService: NgbModal,
    private userService: UserService
  ) {
    if(userService.getToken()){
      userService.getUserFromDatabase().subscribe((user)=>{
        router.navigate(["/dashboard"])
      },()=>{
     
      })
    }
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
     
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

   
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]], // Numéro entre 8 et 15 chiffres
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Méthode de connexion
  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Logged in successfully', response);
          localStorage.setItem("access_token",response.access_token)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          const modalRef =this.modalService.open(ErrorModalComponent);
          modalRef.componentInstance.title = "Login";
          modalRef.componentInstance.message = err.error;
          modalRef.result.then(() => {
 
          });
        }
      });
    }
  }

  // Méthode d'inscription
  register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, phoneNumber, password, gender } = this.registerForm.value;
      this.authService.register(firstName, lastName, email, phoneNumber, password, gender).subscribe({
        next: (response) => {
          localStorage.setItem("access_token",response.access_token)
          const modalRef =this.modalService.open(SuccessModalComponent);
          modalRef.componentInstance.title = "Registration";
          modalRef.componentInstance.message ="Your account has been created! Please wait for admin confirmation." ;
          modalRef.result.then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (err) => {
          console.error('Registration failed', err);
          const modalRef =this.modalService.open(ErrorModalComponent);
          modalRef.componentInstance.title = "Registration";
          modalRef.componentInstance.message = err.error;
          modalRef.result.then(() => {
 
          });
      }});
    }
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}