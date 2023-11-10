import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../_Modelos/response';
import { CarsRequest } from '../_Modelos/cars';
import { FormUtil } from '../Tools/util';
const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private url: string = `${environment.HOST}`;
  constructor(private http:HttpClient) { }

  
  getOffersUser(id:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/getOffers/${id}`)
  }

  editOffer(id:number, carsRequest:CarsRequest): Observable<Response>{
    const formData = FormUtil.buildFormData(carsRequest);
    return this.http.put<Response>(`${this.url}/editarOferta/${id}`,formData);
  }
  deleteOffer(id:number): Observable<Response>{
    return this.http.delete<Response>(`${this.url}/eliminarOferta/${id}`);
  }

 
}
