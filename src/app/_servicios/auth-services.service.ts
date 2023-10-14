import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Response } from "../_Modelos/response";
import { Auth } from "../_Modelos/auth";
import { Login } from "../_Modelos/login";
import { Register } from "../_Modelos/register";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";



const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private url: string = `${environment.HOST}/Auth`;
  private usuarioSubject: BehaviorSubject<Auth>;
  public usua: Observable<Auth>
  private userPayLoad:any;

  public get usuarioData():Auth{
    return this.usuarioSubject.value;
  }

  usuario: Auth;
  constructor(private http:HttpClient, private router:Router) { 
    this.usuarioSubject=
    new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('auth')));
    this.usua= this.usuarioSubject.asObservable();
    

    this.usua.subscribe(res=>{
      this.usuario=res;

      if(this.usuario!==null){
      this.userPayLoad=this.decodeToken()
      }

    })
    // 
    
  
  }

  logUp(register:Register): Observable<Response>{
    return this.http.post<Response>(`${this.url}/Register`,register, httpOption);
  }

  login(login:Login):Observable<Response>{
    return this.http.post<Response>(`${this.url}/login`,login,httpOption).pipe(
      map(res =>{
        if(res.exito ===1){
          const auth:Auth =res.data;
          localStorage.setItem('auth',JSON.stringify(auth));
          this.usuarioSubject.next(auth);
        }
        return res;
      })
    );
  }
  logout(){
    localStorage.removeItem('auth');
    this.usuarioSubject.next(null);
  }

  decodeToken(){
    const jwtHelper =new JwtHelperService();
    const token = this.usuarioData.token;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
  }

  getNameFromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.unique_name;
  }
  getRoleFromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.role;
  }

}
