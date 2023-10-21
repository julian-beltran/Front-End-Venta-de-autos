import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    private resetPasswordServices:ResetPasswordService) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  CheckValidEmail(event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.validEmail=pattern.test(value);
    return this.validEmail;
  }

  confirmSend(){
    if(this.CheckValidEmail(this.resetPassword)){
      console.log(this.resetPassword)
     
      this.resetPasswordServices.SendResetPassworLink(this.resetPassword).subscribe({
        next:(Response)=>{
          this.resetPassword="";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
          alert(Response.mensaje)
        },
        error:(err)=>{
          alert(err?.error.mensaje)

        }
      })
    }
  }

}
