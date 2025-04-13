import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users/data-access/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {   this.userForm = this.fb.group({
    email: [''],
    firstname: [''],
    lastname: [''],
    gender: [''],
    phoneNumber: [''],
    password: ['']
  });

  }

  ngOnInit(): void {
    this.loadUser()
    }

    loadUser(): void {
      this.userService.getUserFromDatabase().subscribe(user => {
        this.userId = user.id;
        this.userForm = this.fb.group({
          email: [user.email],
          firstname: [user.firstname],
          phoneNumber: [user.phoneNumber],
          lastname: [user.lastname],
          gender:[user.gender],
          password: ['']
        });
      });
    }

  onSubmit(): void {
    if (this.userForm.valid) {
      let updatedData = { ...this.userForm.value };
      // Only send password if it's filled in
      if (!updatedData.password) {
        delete updatedData.password;
      }

      this.userService.updateUser(this.userId, updatedData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Modification réussie',
          text: "Votre compte a été modifié !",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // 🔁 Activer dynamiquement l'onglet Login
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload(); // recharge la page complètement
          });;
        });
      });
    }
  }
}
