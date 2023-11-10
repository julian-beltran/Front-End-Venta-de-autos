import { Component, OnInit } from '@angular/core';
import { Auth } from './_Modelos/auth';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { Router } from '@angular/router';
import { UserStoreService } from './_servicios/user-store.service';
import { UsuariosService } from './_servicios/usuarios.service';
import { BarraDeProgresoService } from './_servicios/barra-de-progreso.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VentaCarros';
  usuario: Auth;
  public name: string="";
  public role: string="";
  public idname: string="";
  public lst: any[];
  public imagen:string;
  public flagProgressBar: boolean = true;


  constructor(private barraDeProgresoService: BarraDeProgresoService,private usuariosService :UsuariosService,public authServicesService:AuthServicesService,private router:Router, private userStore: UserStoreService){
      this.authServicesService.usua.subscribe(res=>{
          this.usuario=res;
          console.log(res);
      });

      this.userStore.getnameFromStore().subscribe(val=>{
        const nameFromToken = this.authServicesService.getNameFromToken();
        this.name = val || nameFromToken
      })

      this.userStore.getRolFromStore().subscribe(val=>{
        const rolFromToken = this.authServicesService.getRoleFromToken();
        this.role = val || rolFromToken
      })

      this.userStore.getIdFromStore().subscribe(val=>{
        const IdFromToken = this.authServicesService.getIdFromToken();
        this.idname = val || IdFromToken

        
       if(this.idname !== undefined){
        this.barraDeProgresoService.progressBarReactiva.next(false);
         this.usuariosService.getUser(Number(this.idname)).subscribe(response=>{
           this.lst=response.data;
           this.imagen=response.data.imagen;
           this.barraDeProgresoService.progressBarReactiva.next(true);
       })
      }
      })


      this.barraDeProgresoService.progressBarReactiva.subscribe(data =>{
        this.flagProgressBar = data;  
        
    });
     
  }

  

  logOut(){
    this.authServicesService.logout();
    this.router.navigate(['/login']);
  }


  GetUserLogin(){
    this.barraDeProgresoService.progressBarReactiva.next(false);
    this.usuariosService.getUser(Number(this.idname)).subscribe(response=>{
      this.lst=response.data;
      console.log(response.data);
      this.barraDeProgresoService.progressBarReactiva.next(true);
  })
  }

}
