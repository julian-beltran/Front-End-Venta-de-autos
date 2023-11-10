import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pqrs } from '../_Modelos/pqrs';
import { Response } from '../_Modelos/response';
const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  private url: string = `${environment.HOST}/Pqrs`; 
  constructor(private http:HttpClient) { }
  
  addPqrs(pqrs:Pqrs): Observable<Response>{
    return this.http.post<Response>(this.url,pqrs, httpOption);
  }
  getPqrs():Observable<Response>{
    return this.http.get<Response>(this.url);
  }
}
