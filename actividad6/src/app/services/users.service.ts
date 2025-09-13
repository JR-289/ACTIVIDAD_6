import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { USERS } from '../db/users.db';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private arrayUsers: IUser[] = USERS

  getAll(): IUser[]{
    return this.arrayUsers
  }

  getById(userID: string): IUser | undefined {
    return this.arrayUsers.find(user => user._id === userID) 
  }
  
  
}
