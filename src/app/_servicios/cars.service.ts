import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../_Modelos/response';
import { Observable } from 'rxjs';
import { CarsRequest } from '../_Modelos/cars';
import { FormUtil } from '../Tools/util';

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

  getOffer(idVehicle:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/offer/${idVehicle}`);
  }

  getimages(idVehicle:number):Observable<Response>{
    return this.http.get<Response>(`${this.url}/imagen/${idVehicle}`);
  }

}
