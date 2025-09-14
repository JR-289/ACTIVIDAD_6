import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://peticiones.online/api/users';

  async getAllPromises(): Promise<IUser[]> {
    const obs$ = this.httpClient.get<{ results: IUser[] }>(this.baseUrl);
    const response = await lastValueFrom(obs$);
    console.log('Respuesta API:', response); // 👈 debe mostrar { results: [...] }
    return response.results; // 👈 aquí está el array correcto
  }

  async getById(_id: string): Promise<IUser> {
    const obs$ = this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`);
    return await lastValueFrom(obs$);
  }
}