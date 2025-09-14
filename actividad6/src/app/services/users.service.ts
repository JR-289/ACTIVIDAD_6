import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  // url de la api para conectarme
  private baseUrl: string = 'https://peticiones.online/api/users/'



  /* opcion 2*/
  /* promises en angular - peticiones asincronas generales de javascript - convertir observable en un promesas */
  getAllPromises(url: string): Promise<any> {
    const miUrl = (url === "") ? this.baseUrl : url
    return lastValueFrom(this.httpClient.get<any>(miUrl))
  }

  /* metodo para obtener un unico personaje*/
  getById(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${id}`))
  }
  
}
