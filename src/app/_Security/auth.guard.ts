import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServicesService } from "../_servicios/auth-services.service";
import { UsuariosService } from "../_servicios/usuarios.service";
import { UserStoreService } from "../_servicios/user-store.service";





@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

public role: string="";
    constructor(private router:Router,
        private authServices:AuthServicesService,
        private usuariosService :UsuariosService,
        private userStore: UserStoreService){

    }
    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const usuario=this.authServices.usuarioData;
        const url:string =state.url;
        this.userStore.getRolFromStore().subscribe(val=>{
            const rolFromToken = this.authServices.getRoleFromToken();
            this.role = val || rolFromToken
            console.log(this.role)
          })

        if(usuario){
            if(url.includes('Usuarios')||url.includes('AprovarAutos')||url.includes('AutosAprovados')||url.includes('/MisPqrs')){
                if(this.role==='comprador'||this.role=='vendedor'){
                    this.router.navigate(['/SinPermiso']);
                    return false;
                }
            }

            if(url.includes('AgregarAuto')||url.includes('MisOfertas')||url.includes('MisVentas')||url.includes('Mensajes')){
                if(this.role==='comprador'||this.role=='administrador'){
                    this.router.navigate(['/SinPermiso']);
                    return false;
                }
            }

            if(url.includes('Autos')||url.includes('MisCompras')||url.includes('Pqrs')){
                if(this.role==='vendedor'){
                    this.router.navigate(['/SinPermiso']);
                    return false;
                }
            }

            return true;
        }
        this.router.navigate(['/login']);
        return false;

        // if(url.includes('usuarios')&& this.role ==='administrador')
       
    
        
    }


    
}