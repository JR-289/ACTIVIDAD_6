import { Component, inject,} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IResponse } from '../../interfaces/iresponse.interface';


@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  arrayUsers: IUser[] = [];
  usersService = inject(UsersService);
  currentPage = 1;

  async ngOnInit(): Promise<void> {
    await this.cargarUsers(this.currentPage);
  }

  async cargarUsers(page: number) {
    const response: IResponse = await this.usersService.getAllPromises(page);
    this.arrayUsers = response.results;
    this.currentPage = response.page;
  }

  async gotoPrev() {
    const prevPage = this.currentPage === 1 ? 2 : 1;
    await this.cargarUsers(prevPage);
  }

  async gotoNext() {
    const nextPage = this.currentPage === 2 ? 1 : 2;
    await this.cargarUsers(nextPage);
  }
  
getAlertDelete(event: string){
  this.cargarUsers(this.currentPage)
  alert(event)
}
  
}