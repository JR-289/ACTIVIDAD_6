import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';


@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  arrayUsers: IUser[] = []

  usersService = inject(UsersService)

ngOnInit () {
  console.log(this.cargarUsers)
  this.cargarUsers()
  
}

async cargarUsers(id: any = "") {
    /* consumicion de las promesas - generica que tiene javascript de hacer peticiones http */
    try {
      const response: any = await this.usersService.getAllPromises(id)

      this.arrayUsers = response.id
     
    }
    catch (error) {
      console.log(error)
    }
  }



}
