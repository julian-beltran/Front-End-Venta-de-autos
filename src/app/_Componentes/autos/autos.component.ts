import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { CarsService } from 'src/app/_servicios/cars.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  public name: string="";
  public lst: any[];
  public i:[];
  public page! : number;
  filterPost = '';
  filterPostModelo='';
  filterPostCarroseria = '';
  images: any[] | undefined=["https://compraventacarros.blob.core.windows.net/users/D_Q_NP_602390-MCO72349386442_102023-R.webp","https://compraventacarros.blob.core.windows.net/users/D_Q_NP_602390-MCO72349386442_102023-R.webp","https://compraventacarros.blob.core.windows.net/users/D_Q_NP_602390-MCO72349386442_102023-R.webp"];
  
  
  constructor(private barraProgresoService: BarraDeProgresoService,private userStore: UserStoreService, public authServicesService:AuthServicesService,
    public carsService: CarsService) { }

  ngOnInit(): void {
    this.userStore.getnameFromStore().subscribe(val=>{
      let nameFromToken = this.authServicesService.getNameFromToken();
      this.name = val || nameFromToken
    })

    this. getVehicles()
  }


  getVehicles(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.carsService.getVehicles().subscribe(response=>{
      this.lst=response.data;  
      this.barraProgresoService.progressBarReactiva.next(true);    
  })}

 



  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

}
