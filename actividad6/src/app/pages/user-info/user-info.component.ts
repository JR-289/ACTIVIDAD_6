import { Component,Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  @Input() idUser: string = ''; // opcional, también soporta /user/:id
  myUser: IUser | null = null;
  loading = true;

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
}