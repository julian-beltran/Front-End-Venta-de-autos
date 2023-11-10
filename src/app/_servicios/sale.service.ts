import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SalesPost } from '../_Modelos/sales';
import { Response } from '../_Modelos/response';
const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private url: string = `${environment.HOST}/Sales`;
  constructor(private http:HttpClient) { }


  addSales(salesPost:SalesPost): Observable<Response>{
    return this.http.post<Response>(this.url,salesPost, httpOption);
  }
  getSales(id:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/MySales/${id}`)
  }
}
