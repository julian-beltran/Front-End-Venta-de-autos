import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { SaleService } from 'src/app/_servicios/sale.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';

@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.css']
})
export class SaleslistComponent implements OnInit {
  public idname:string="";
  public lst: any[];
  public page! : number;
  constructor(private userStore: UserStoreService,
    public authServicesService:AuthServicesService,
    public saleServices:SaleService,
    private barraProgresoService: BarraDeProgresoService) {
      this.userStore.getIdFromStore().subscribe(val=>{
        const IdFromToken = this.authServicesService.getIdFromToken();
        this.idname = val || IdFromToken
      })
     }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.saleServices.getSales(Number(this.idname)).subscribe(response=>{
      this.lst=response.data;
      this.barraProgresoService.progressBarReactiva.next(true);
    });
  }
}
