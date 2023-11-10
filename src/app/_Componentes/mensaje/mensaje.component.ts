import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { CarsService } from 'src/app/_servicios/cars.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  public display:string[]=['idVehiculo','id','nombre','apellido','telefono','Email','Mensaje']
  public lst: any[] = null;
  public id:number
  public idname: string="";

  constructor(private barraProgresoService: BarraDeProgresoService,public carService:CarsService,private userStore: UserStoreService,
    public authServicesService:AuthServicesService) { }

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
      this.id= Number(this.idname);
    })
    this.getMessages()
  }

  getMessages(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.carService.getMessages(this.id).subscribe(response=>{
      this.lst=response.data;
      this.barraProgresoService.progressBarReactiva.next(true);
    })

  }
}
