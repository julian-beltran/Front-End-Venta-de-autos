import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { CarsService } from 'src/app/_servicios/cars.service';
import { OffersService } from 'src/app/_servicios/offers.service';
import { environment } from 'src/environments/environment';
import { CarsRequest } from 'src/app/_Modelos/cars';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  azureStorageBaseUrl = environment.azureStorageBaseUrl;
  @ViewChild('imageFileUpload1', { static: false }) imageFileUpload1?: FileUpload;
  @ViewChild('imageFileUpload2', { static: false }) imageFileUpload2?: FileUpload;
  @ViewChild('imageFileUpload3', { static: false }) imageFileUpload3?: FileUpload;

public idname: string="";
  public lst: any;
  public id:number
  constructor(
    private barraProgresoService: BarraDeProgresoService,
    private router:Router, 
    private route: ActivatedRoute,
    public offersService:OffersService, 
    public carservice:CarsService,
    private fb:FormBuilder,
    private userStore: UserStoreService,
    public authServicesService:AuthServicesService) { }
 

    public CarsForm = this.fb.group({
      Marca:['', Validators.required],
      Linea:['', Validators.required],
      Modelo:[, Validators.required],
      Carroseria:['', Validators.required],
      Kilometraje:[, Validators.required],
      Placa:['', Validators.required],
      Precio: [, Validators.required],
      descripcion:['', Validators.required],
    });

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      const idVehicle =params['idVehicle'];
      this.loadVehicle(idVehicle);
    });

    this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
      this.id= Number(this.idname);
    })
  }

  loadVehicle(id:number): void{
    this.barraProgresoService.progressBarReactiva.next(false);
    this.carservice.getOffer(id).subscribe(response=>{
      this.lst = response.data
      this.barraProgresoService.progressBarReactiva.next(true);
    });

  }

  editVehicle(event: Event):void{
    this.barraProgresoService.progressBarReactiva.next(false);
    let car: CarsRequest ={
      ...this.CarsForm.value
    };
    if(this.imageFileUpload1?.files.length &&this.imageFileUpload2?.files.length && this.imageFileUpload3?.files.length){
      car.Imagen1=this.imageFileUpload1.files[0];
      car.Imagen2=this.imageFileUpload2.files[0];
      car.Imagen3=this.imageFileUpload3.files[0];
    }
    car.IdPersona=this.id 
    this.offersService.editOffer(this.lst.idVehicle,car).subscribe({
      next:(Response)=>{
        if(Response.exito===1){
          alert(Response.mensaje);
          this.router.navigate(['/MisOfertas']);
          this.barraProgresoService.progressBarReactiva.next(true);
          
        }
        alert(Response.mensaje);
        this.barraProgresoService.progressBarReactiva.next(true);

      }
      
    });
  }

}
