import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthServicesService } from "../_servicios/auth-services.service";
import { usuario } from './../_Modelos/Usuarios';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from "@angular/router";

@Injectable() 
export class JwtInterceptor implements HttpInterceptor{
    constructor(private authService: AuthServicesService,
                private route:Router){

    }
    intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        const usuario=this.authService.usuarioData;

        if(usuario){
            request=request.clone({
                setHeaders:{
                    Authorization:`Bearer ${usuario.token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError((err:any)=>{
                if(err.status === 401){
                   
                    alert("su sesion a expirado");
                    this.authService.logout();
                    this.route.navigate(['login']);
                    
                }
                return throwError(()=>new Error("Ocurrio algun error"))
            })
        );
    }
}