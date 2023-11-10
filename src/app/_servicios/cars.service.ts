import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../_Modelos/response';
import { Observable } from 'rxjs';
import { Approval, CarsRequest, SaleState } from '../_Modelos/cars';
import { FormUtil } from '../Tools/util';
import { Mensaje } from '../_Modelos/mensaje';
const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private url: string = `${environment.HOST}/VehicleOffer`;
  constructor(private http:HttpClient) { }
  
  getVehicles():Observable<Response>{
    return this.http.get<Response>(this.url);
  }


  addVehicles(carsRequest:CarsRequest):Observable<Response>{
    const formData = FormUtil.buildFormData(carsRequest);
    return this.http.post<Response>(`${this.url}`,formData);
  }


  getOffers():Observable<Response>{
    return this.http.get<Response>(`${this.url}/getOffers`);
  }
  getOffersApprove():Observable<Response>{
    return this.http.get<Response>(`${this.url}/getOffersApprove`);
  }

  getOffer(idVehicle:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/offer/${idVehicle}`);
  }

  getimages(idVehicle:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/imagen/${idVehicle}`);
  }

  approvalOffer(id:number, approval:Approval): Observable<Response>{
    return this.http.put<Response>(`${this.url}/${id}`,approval);
  }
  SaleStateOffer(id:number, saleState:SaleState): Observable<Response>{
    return this.http.put<Response>(`${this.url}/estadoCompra/${id}`,saleState);
  }

  addMessage(mensaje:Mensaje): Observable<Response>{
    return this.http.post<Response>(`${this.url}/Mensaje`,mensaje, httpOption);
  }

  getMessages(id:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/getMensajes/${id}`)
  }

}
