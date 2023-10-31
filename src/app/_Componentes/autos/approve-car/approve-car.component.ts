import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/_servicios/cars.service';

@Component({
  selector: 'app-approve-car',
  templateUrl: './approve-car.component.html',
  styleUrls: ['./approve-car.component.css']
})
export class ApproveCarComponent implements OnInit {

  public display:string[]=['Foto','idVehicle','nombre','apellido','telefono','direccion','acciones']
  public lst: any[];

  constructor(public carService:CarsService) { }

  ngOnInit(): void {
    this.getOffers()
  }

  getOffers(){
    this.carService.getOffers().subscribe(response=>{
      this.lst=response.data;
    console.log(this.lst)
    })

  }

}
