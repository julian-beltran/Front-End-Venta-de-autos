import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { UsuariosService } from 'src/app/_servicios/usuarios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public name: string="";
  public role: string="";
  public idname: string="";
  public lst: any;
  nombre:string;
  apellido: string;
  telefono: string;
  ocupacion:string;
  direccion:string;
  edad:number;
  rol: string;
  email:string;
  imagen:string;
  sexo:string;
  usuario1:string;
  id:number;
  idPersona:number






  constructor(private barraDeProgresoService: BarraDeProgresoService,
    private usuariosService :UsuariosService,
    public authServicesService:AuthServicesService,
    private router:Router, 
    private userStore: UserStoreService) {
    this.userStore.getnameFromStore().subscribe(val=>{
      const nameFromToken = this.authServicesService.getNameFromToken();
      this.name = val || nameFromToken
    })

    this.userStore.getRolFromStore().subscribe(val=>{
      const rolFromToken = this.authServicesService.getRoleFromToken();
      this.role = val || rolFromToken
    })

    this.userStore.getIdFromStore().subscribe(val=>{
      
    this.barraDeProgresoService.progressBarReactiva.next(false);
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken

      
     if(this.idname !== undefined){
       this.usuariosService.getUser(Number(this.idname)).subscribe(response=>{
         this.lst=response.data;
         console.log(this.lst)
         this.nombre=this.lst.nombre;
         this.apellido =this.lst.apellido;
         this.telefono = this.lst.telefono;
         this.ocupacion = this.lst.ocupacion;
         this.direccion = this.lst.direccion;
         this.edad = this.lst.edad;
         this.rol = this.lst.rol;
         this.email = this.lst.email;
         this.imagen = this.lst.imagen;
         this.sexo = this.lst.sexo;
         this.usuario1 = this.lst.usuario1;
         this.id=this.lst.id;
         this.idPersona = this.lst.idPersona;
         this.barraDeProgresoService.progressBarReactiva.next(true);
     })
    }
    })
   }

  ngOnInit(): void {
  }

  

}
