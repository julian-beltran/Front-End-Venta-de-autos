import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
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
  images: any[] | undefined=["https://compraventacarros.blob.core.windows.net/users/D_Q_NP_602390-MCO72349386442_102023-R.webp","https://compraventacarros.blob.core.windows.net/users/D_Q_NP_602390-MCO72349386442_102023-R.webp","https://compraventacarros.blob.core.windows.net/users/D_Q_NP_602390-MCO72349386442_102023-R.webp"];
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  
  constructor(private userStore: UserStoreService, public authServicesService:AuthServicesService,
    public carsService: CarsService) { }

  ngOnInit(): void {
    this.userStore.getnameFromStore().subscribe(val=>{
      let nameFromToken = this.authServicesService.getNameFromToken();
      this.name = val || nameFromToken
    })

    this. getVehicles()
  }


  getVehicles(){
    this.carsService.getVehicles().subscribe(response=>{
      this.lst=response.data;      
  })}



  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

}
