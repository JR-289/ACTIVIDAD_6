import { Component,Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  
  @Input() _id: string = ""
  myUser! : IUser
  usersService = inject(UsersService)
  router = inject(Router)

  ngOnInit(){

  
  }

}
