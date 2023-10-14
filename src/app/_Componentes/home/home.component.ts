import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public name: string="";
  constructor(private userStore: UserStoreService, public authServicesService:AuthServicesService) { }

  ngOnInit(): void {
    this.userStore.getnameFromStore().subscribe(val=>{
      let nameFromToken = this.authServicesService.getNameFromToken();
      this.name = val || nameFromToken
    })
  }

}
