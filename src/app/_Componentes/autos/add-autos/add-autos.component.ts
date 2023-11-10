import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { CarsRequest } from 'src/app/_Modelos/cars';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { CarsService } from 'src/app/_servicios/cars.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { UsuariosService } from 'src/app/_servicios/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-autos',
  templateUrl: './add-autos.component.html',
  styleUrls: ['./add-autos.component.css']
})
export class AddAutosComponent implements OnInit {
  azureStorageBaseUrl = environment.azureStorageBaseUrl;
  @ViewChild('imageFileUpload1', { static: false }) imageFileUpload1?: FileUpload;
  @ViewChild('imageFileUpload2', { static: false }) imageFileUpload2?: FileUpload;
  @ViewChild('imageFileUpload3', { static: false }) imageFileUpload3?: FileUpload;
  public idname: string="";
  public lst: any[];
  public id:number


  constructor(private barraProgresoService: BarraDeProgresoService,private router:Router, private fb:FormBuilder,public carService:CarsService,
    private userStore: UserStoreService,public authServicesService:AuthServicesService,private usuariosService :UsuariosService) { }
  
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
    this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
      this.id= Number(this.idname);
      console.log(this.id)
      
     if(this.idname !== undefined){
       this.usuariosService.getUser(Number(this.idname)).subscribe(response=>{
         this.lst=response.data;
     })
    }
    })
  }

  add(){
    this.barraProgresoService.progressBarReactiva.next(false);
    let car:CarsRequest={
      ...this.CarsForm.value
    };
    if(this.imageFileUpload1?.files.length &&this.imageFileUpload2?.files.length && this.imageFileUpload3?.files.length){
      car.Imagen1=this.imageFileUpload1.files[0];
      car.Imagen2=this.imageFileUpload2.files[0];
      car.Imagen3=this.imageFileUpload3.files[0];
    }
    car.IdPersona=this.id 
    this.carService.addVehicles(car).subscribe({
      next:(Response)=>{
      if(Response.exito===1){
        alert(Response.mensaje);
        this.router.navigate(['/MisOfertas']);
        this.barraProgresoService.progressBarReactiva.next(true);
      }
      alert(Response.mensaje);
      this.barraProgresoService.progressBarReactiva.next(true);
    },
     error:(err)=>{
       alert(" El formulario Esta mal diligenciado: "+err?.error.mensaje);
       this.barraProgresoService.progressBarReactiva.next(true);
     }
  
  });
  }

}
