import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carousel } from '../_Modelos/carrousel';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http:HttpClient) { }
  getCarousel(){
    return this.http.get<any>(`assets/ArchivosConfig/carrousel.json`)
    .toPromise()
    .then(res => <Carousel[]>res.data)
    .then(data => {return data;});
  }
}
