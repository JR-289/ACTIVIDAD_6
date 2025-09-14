import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  // url de la api para conectarme
  private baseUrl: string = 'https://peticiones.online/api/users/'



  /* opcion 2*/
  /* promises en angular - peticiones asincronas generales de javascript - convertir observable en un promesas */
  getAllPromises(id: string): Promise<any> {
    const _id = (id === "") ? this.baseUrl : id
    return lastValueFrom(this.httpClient.get<IUser>(_id))
  }

  /* metodo para obtener un unico personaje*/
  getById(_id: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${_id}`))
  }
  
}
