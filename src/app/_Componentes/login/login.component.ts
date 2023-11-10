import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { Login } from './../../_Modelos/login';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { MatDialog } from '@angular/material/dialog';
import { PassworForgetComponent } from './passwor-forget/passwor-forget.component';
import { MessageService } from 'primeng/api';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    usuario1: ['', Validators.required],
    contraseña:['', Validators.required]
  });

  type:string ="password";
  isText: boolean = false;
  visibility: string ="visibility_off"

  constructor(public authService:AuthServicesService,
    private router:Router, private fb:FormBuilder,
    private messageService: MessageService,
    public storeService:UserStoreService,
    public dialog: MatDialog,
    private barraProgresoService: BarraDeProgresoService,
    ) {
      if(this.authService.usuarioData){
        this.router.navigate(['/']);
      }

   }

  ngOnInit(): void {
  }

  log(){
    this.barraProgresoService.progressBarReactiva.next(false);
    // if(this.loginForm.valid){
    //   this.authService.login(this.loginForm.value).subscribe({
    //     next:(res)=>{
    //       alert(res.mensaje)
    //     },
    //     error:(err)=>{
    //       alert(err?.error.mensaje)
    //     }

    //   })
    // }
     console.log(this.loginForm.value)
     this.authService.login(this.loginForm.value).subscribe({
      next:(Response)=>{
       if(Response.exito===1){
        
        this.messageService.add({ severity: 'success', summary: 'Ingreso', detail: Response.mensaje,life:  20000 });
         alert(Response.mensaje);
         const tokenPayLoad = this.authService.decodeToken();
         this.storeService.setNameFromStore(tokenPayLoad.unique_name);
         this.storeService.setRolFromStore(tokenPayLoad.role);
         this.storeService.setIdFromStore(tokenPayLoad.nameid);
         this.router.navigate(['/Inicio']);
         this.barraProgresoService.progressBarReactiva.next(true);
        
       }
       this.messageService.add({ severity: 'error', summary: 'Error', detail: Response.mensaje, life: 10000 });
       
     },
       error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.Response.mensaje });
             } 
    });
  }

  hideShwoPass(){
    this.isText =!this.isText;
    this.isText ? this.visibility = "visibility": this.visibility = "visibility_off";
    this.isText ? this.type = "text" : this.type ="password";

  }

  openDialog(){
    const dialogRef = this.dialog.open(PassworForgetComponent, {      
    });
  }

}
