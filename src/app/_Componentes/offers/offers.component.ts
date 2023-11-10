import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { OffersService } from 'src/app/_servicios/offers.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { DeleteComponent } from './delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  public lst: any[] = null;
  public id:number
  public idname: string="";
  public page! : number;
  filterPost = '';
  filterPostModelo='';
  filterPostCarroseria = '';

  constructor(private barraProgresoService: BarraDeProgresoService,
    private userStore: UserStoreService, public authServicesService:AuthServicesService,
    public offerService: OffersService,
    public dialog:MatDialog,
    public snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
      this.id= Number(this.idname);
    })

    this.getOffers()
  }

  getOffers(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.offerService.getOffersUser(this.id).subscribe(response=>{
      this.lst=response.data;
      this.barraProgresoService.progressBarReactiva.next(true);
    })
  }

  openDelete(id:number){
    const dialogRef= this.dialog.open(DeleteComponent,{
      width:'500',
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.offerService.deleteOffer(id).subscribe(response=> {
          if(response.exito === 1) {
            this.snackBar.open('Oferta eliminada con exito','',{
              duration: 2000
            });
            
      this.getOffers()
          }
        });
      }
    });
}

}
