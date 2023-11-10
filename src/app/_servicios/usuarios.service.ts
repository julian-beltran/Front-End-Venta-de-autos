import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../_Modelos/response';
import { usuario } from '../_Modelos/Usuarios';
import { Register } from '../_Modelos/register';
import { FormUtil } from '../Tools/util';

const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url: string = `${environment.HOST}/User`; 
  constructor(private http:HttpClient) { }

  getUsers():Observable<Response>{
    return this.http.get<Response>(this.url);
  }

  addUser(usuario:usuario): Observable<Response>{
    return this.http.post<Response>(this.url,usuario, httpOption);
  }

  editUser(id:number, usuario:usuario): Observable<Response>{
    return this.http.put<Response>(`${this.url}/${id}`,usuario);
  }
  deleteUser(id:number): Observable<Response>{
    return this.http.delete<Response>(`${this.url}/${id}`);
  }

  getUser(id:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/${id}`);
  }

  editMyUser(register:Register): Observable<Response>{
    const formData = FormUtil.buildFormData(register);
    return this.http.put<Response>(`${this.url}/editar`,formData);
  }
}
