import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/app/_Modelos/carrousel';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { CarouselService } from 'src/app/_servicios/carousel.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public name: string="";
  carousel!:Carousel[];
  constructor(private barraProgresoService: BarraDeProgresoService,private userStore: UserStoreService, 
      public authServicesService:AuthServicesService,
      public carouseService:CarouselService) { }

  ngOnInit(): void {
    this.userStore.getnameFromStore().subscribe(val=>{
      let nameFromToken = this.authServicesService.getNameFromToken();
      this.name = val || nameFromToken
    })

    this.getImages();
  }

  getImages(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.carouseService.getCarousel().then(carousel=>{
      this.carousel = carousel;
      this.barraProgresoService.progressBarReactiva.next(true);
    })

  }

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

}
