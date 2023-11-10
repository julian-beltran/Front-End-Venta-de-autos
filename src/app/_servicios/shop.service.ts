import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../_Modelos/response';
const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url: string = `${environment.HOST}`;
  constructor(private http:HttpClient) { }
  

  getShops(id:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/MyShops/${id}`)
  }
}
