import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IError, IUser } from '../interfaces/iuser.interface';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://peticiones.online/api/users';

async getAllPromises(page: number = 1): Promise<IResponse> {
  const obs$ = this.httpClient.get<IResponse>(`https://peticiones.online/api/users/?page=${page}`);
  return await lastValueFrom(obs$);
}

async getById(_id: string): Promise<IUser> {
    const obs$ = this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`);
    return await lastValueFrom(obs$);
  }

async updateUser(user: IUser): Promise<any> {
  let { _id, ...restUser} = user
  return lastValueFrom(this.httpClient.put(`${this.baseUrl}/${_id}`, restUser))
}



async createUser(user: IUser): Promise<IUser> {
    const obs$ = this.httpClient.post<IUser>(this.baseUrl, user);
    return await lastValueFrom(obs$);
  
  }


async deleteUser(_id: string): Promise<IUser | IError> {
  const obs$ = this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`);
  return await lastValueFrom(obs$);
}
}

