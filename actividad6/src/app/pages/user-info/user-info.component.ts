import { Component,Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-info',
  imports: [RouterLink],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  
  @Input() idUser: string = ''; // opcional, también soporta /user/:id
  myUser: IUser | null = null; // ?
  loading = true; // ? 

  usersService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit() {
    const id = this.idUser || this.route.snapshot.paramMap.get('_id') || '';
    if (!id) {
      this.router.navigate(['/error']);
      return;
    }

    try {
      const response = await this.usersService.getById(id);
      if (!response) {
        this.router.navigate(['/error']);
        return;
      }
      this.myUser = response;
    } catch {
      this.router.navigate(['/error']);
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(['/userList']);
  }

  goEdit() {
    if (this.myUser?._id) {
      this.router.navigate(['/updateuser', this.myUser._id]);
    }
  }
  async onDelete() {
    if (!this.myUser?._id) return;

    const confirmed = confirm(`¿Seguro que deseas eliminar a "${this.myUser.first_name}"?`);
    if (!confirmed) return;

    try {
      await this.usersService.deleteUser(this.myUser._id);
      alert('Usuario eliminado correctamente.');
      this.router.navigate(['/home']); // redirigir al listado después de borrar
    } catch (err) {
      console.error('Error al eliminar usuario', err);
      alert('No se pudo eliminar el usuario.');
    }
  }

  
  
}