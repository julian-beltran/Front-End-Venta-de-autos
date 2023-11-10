import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { CarsService } from 'src/app/_servicios/cars.service';

@Component({
  selector: 'app-approve-car-true',
  templateUrl: './approve-car-true.component.html',
  styleUrls: ['./approve-car-true.component.css']
})
export class ApproveCarTrueComponent implements OnInit {

  public display:string[]=['Foto','idVehicle','nombre','apellido','telefono','direccion','acciones']
  public lst = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private barraProgresoService: BarraDeProgresoService, public carService:CarsService) { }

  ngOnInit(): void {
    this.getOffers()
  }

  getOffers(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.carService.getOffersApprove().subscribe(response=>{
      this.lst=new MatTableDataSource(response.data);
      this.lst.paginator = this.paginator;
      this.barraProgresoService.progressBarReactiva.next(true);
    })

  }

}
