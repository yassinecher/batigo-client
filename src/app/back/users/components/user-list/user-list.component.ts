import { Component } from '@angular/core';
import { UserService } from '../../data-access/user.service';
import { User } from '../../data-access/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userList:User[]=[]
constructor(private userService:UserService){
userService.getUsersList().subscribe((userList)=>{
  this.userList=userList
})
}
}
