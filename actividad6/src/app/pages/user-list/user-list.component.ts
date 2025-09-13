import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

userService = inject(UsersService)
arrayUsers: IUser[] = []

ngOnInit () {
  this.arrayUsers = this.userService.getAll()
}

}
