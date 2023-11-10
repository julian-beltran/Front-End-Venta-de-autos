import { Component, OnInit } from '@angular/core';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { PqrsService } from 'src/app/_servicios/pqrs.service';

@Component({
  selector: 'app-getpqrs',
  templateUrl: './getpqrs.component.html',
  styleUrls: ['./getpqrs.component.css']
})
export class GetpqrsComponent implements OnInit {
  public display:string[]=['imagen','tipoPqrs','nombre','apellido','telefono','Mensaje']
  public lst: any[] = null;
  public id:number
  public idname: string="";

  constructor(public pqrsService:PqrsService,private barraProgresoService: BarraDeProgresoService) { }

  ngOnInit(): void {
    this.Getpqrs();
  }
  Getpqrs(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.pqrsService.getPqrs().subscribe(response=>{
      this.lst=response.data;
      this.barraProgresoService.progressBarReactiva.next(true);
    })

  }

}
