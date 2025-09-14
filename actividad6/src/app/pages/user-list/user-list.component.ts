import { Component, inject,} from '@angular/core';
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
  arrayUsers: IUser[] = [];
  usersService = inject(UsersService);

  async ngOnInit(): Promise<void> {
    await this.cargarUsers();
  }

  async cargarUsers() {
    try {
      this.arrayUsers = await this.usersService.getAllPromises();
    
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  }
}