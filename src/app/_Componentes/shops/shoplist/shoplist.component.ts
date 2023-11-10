import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { ShopService } from 'src/app/_servicios/shop.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';

@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.css']
})
export class ShoplistComponent implements OnInit {
  public idname:string="";
  public lst: any[];
  public page! : number;

  constructor(private userStore: UserStoreService,
    public authServicesService:AuthServicesService,
    public shopServices:ShopService,
    private barraProgresoService: BarraDeProgresoService,) {

      this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
    }) }

  ngOnInit(): void {
    this. getShops()
  }

  getShops(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.shopServices.getShops(Number(this.idname)).subscribe(response=>{
      this.lst=response.data;
      this.barraProgresoService.progressBarReactiva.next(true);
    });
  }

}
