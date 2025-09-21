import { Component, input, Output , inject, EventEmitter} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  myUser = input<IUser>();

  private usersService = inject(UsersService);

  @Output() userDeleted = new EventEmitter<string>();

  async onDelete() {
    const user = this.myUser();
    if (!user?._id) return;

    const confirmed = confirm(`¿Seguro que deseas eliminar al usuario "${user.first_name}"?`);
    if (!confirmed) return;

    try {
      await this.usersService.deleteUser(user._id);
      toast.error("Usuario con ID:" + user._id + " eliminado correctamente.");
      this.userDeleted.emit(user._id);
    } catch (err) {
      
      toast.error('Error al eliminar usuari');
    }
  }
}
