import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from './../../_Modelos/ResetPassword';
import { ConfirmPasswordValidator } from 'src/app/Tools/PasswordValidator';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/_servicios/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  PasswordForm : FormGroup;
  emailToReset: string;
  emailToken:string;
  resetPasswordO=new ResetPassword();
  


  type:string ="password";
  isText: boolean = false;
  visibility: string ="visibility_off";

  constructor(private fb:FormBuilder, private activateRoute:ActivatedRoute, 
    public resetPasswordService: ResetPasswordService, private router:Router) { }

  ngOnInit(): void {
     this.PasswordForm = this.fb.group({
      Password: ['', Validators.required],
      confirmPassword:['', Validators.required]
    }
     ,{
       validator: ConfirmPasswordValidator("Password", "confirmPassword")
     }
    );
    this.activateRoute.queryParams.subscribe(val=>{
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken= uriToken.replace(/ /g,'+');
      console.log(this.emailToReset);
      console.log(this.emailToken);
    })
  }
  reset(){
    this.resetPasswordO.email=this.emailToReset;
    this.resetPasswordO.newPassword=this.PasswordForm.value.Password;
    this.resetPasswordO.confirmPassword=this.PasswordForm.value.confirmPassword;
    this.resetPasswordO.emailToken=this.emailToken;
    this.resetPasswordService.resetPassword(this.resetPasswordO).subscribe({
      next:(Response)=>{
        if(Response.exito===1){
          alert(Response.mensaje);
          this.router.navigate(['/login'])
        }
      },
      error:(err)=>{
            alert(err?.error.mensaje);
            } 
    });

  }

  hideShwoPass(){
    this.isText =!this.isText;
    this.isText ? this.visibility = "visibility": this.visibility = "visibility_off";
    this.isText ? this.type = "text" : this.type ="password";

  }

}
