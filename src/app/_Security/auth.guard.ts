import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthServicesService } from "../_servicios/auth-services.service";





@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

    constructor(private router:Router,
        private authServices:AuthServicesService){

    }
    canActivate(route:ActivatedRouteSnapshot){
        const usuario=this.authServices.usuarioData;
        if(usuario){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    
}