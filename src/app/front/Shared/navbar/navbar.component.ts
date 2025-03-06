import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/back/users/data-access/User.model';
import { UserService } from 'src/app/back/users/data-access/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
user!:User
  constructor(private modalService: NgbModal,userService:UserService) {
    userService.getUserFromDatabase().subscribe((user)=>{
      this.user=user
    })
  }
}
