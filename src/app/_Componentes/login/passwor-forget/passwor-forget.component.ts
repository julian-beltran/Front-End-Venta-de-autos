import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { ResetPasswordService } from 'src/app/_servicios/reset-password.service';


@Component({
  selector: 'app-passwor-forget',
  templateUrl: './passwor-forget.component.html',
  styleUrls: ['./passwor-forget.component.css']
})
export class PassworForgetComponent implements OnInit {

  public resetPassword: string;
  public validEmail: boolean;
  constructor(public dialogRef: MatDialogRef<PassworForgetComponent>,
    private resetPasswordServices:ResetPasswordService,
    private barraProgresoService: BarraDeProgresoService,) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  CheckValidEmail(event: string){
    this.barraProgresoService.progressBarReactiva.next(false);
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.validEmail=pattern.test(value);
    this.barraProgresoService.progressBarReactiva.next(true);
    return this.validEmail;
  }

  confirmSend(){
    this.barraProgresoService.progressBarReactiva.next(false);
    if(this.CheckValidEmail(this.resetPassword)){
      console.log(this.resetPassword)
     
      this.resetPasswordServices.SendResetPassworLink(this.resetPassword).subscribe({
        next:(Response)=>{
          this.resetPassword="";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
          alert(Response.mensaje)
          this.barraProgresoService.progressBarReactiva.next(true);
        },
        error:(err)=>{
          alert(err?.error.mensaje)
          this.barraProgresoService.progressBarReactiva.next(true);

        }
      })
    }
  }

}
