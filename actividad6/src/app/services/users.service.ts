import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';
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

async createUser(body: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
  }): Promise<any> {
    const obs$ = this.httpClient.post<any>(this.baseUrl, body);
    return await lastValueFrom(obs$);
  }
async deleteUser(_id: string): Promise<any> {
  const obs$ = this.httpClient.delete<any>(`${this.baseUrl}/${_id}`);
  return await lastValueFrom(obs$);
}
}

