import { Component,Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-info',
  imports: [RouterLink],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  
  @Input() idUser: string = ''; 
  myUser: IUser | any;
  // loading = true;

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
    }
    // } finally {
    //   this.loading = false;
    // }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
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
       toast.error("Usuario con ID:" + this.myUser._id + " eliminado correctamente.");
      this.router.navigate(['/dashboard']); 
    } catch (err) {
      console.error('Error al eliminar usuario', err);
      alert('No se pudo eliminar el usuario.');
    }
  }
  
}