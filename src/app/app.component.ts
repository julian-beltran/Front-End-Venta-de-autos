import { Component, OnInit } from '@angular/core';
import { Auth } from './_Modelos/auth';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { Router } from '@angular/router';
import { UserStoreService } from './_servicios/user-store.service';

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
  constructor(public authServicesService:AuthServicesService,private router:Router, private userStore: UserStoreService){
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
     
  }

  

  logOut(){
    this.authServicesService.logout();
    this.router.navigate(['/login']);
  }

}
