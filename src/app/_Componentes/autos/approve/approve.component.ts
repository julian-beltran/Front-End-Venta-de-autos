import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { imagenes } from 'src/app/_Modelos/imagenes';
import { CarsService } from 'src/app/_servicios/cars.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,public carsService: CarsService) { }

  idVehicle:number;
  aprovacion: boolean;
  nombre: string;
  apellido:string;
  telefono:string;
  direccion:string;
  imagen:string;
  idPersona:number;
  marca:string;
  linea:string;
  modelo:string;
  carroseria:string;
  kilometraje: number;
  placa:string;
  precio:number;
  imagen1:string="";
  imagen2:string="";
  imagen3: string="";
  descripcion:string;
  correo: string;
  rol: string;
  imagenes:any[];
  
  

  responsiveOptions: any[] | undefined;


  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      const idVehicle =params['idVehicle'];
      this.loadOfferInfo(idVehicle);
    });


    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  }

  loadOfferInfo(idVehicle:number){
    this.carsService.getOffer(idVehicle).subscribe(response=>{
      
      this.idVehicle = response.data.idVehicle;
      this.aprovacion = response.data.aprovacion;
      this.nombre = response.data.nombre;
      this.apellido = response.data.apellido;
      this.telefono = response.data.telefono;
      this.direccion = response.data.direccion;
      this.imagen = response.data.imagen;
      this.idPersona = response.data.idPersona;
      this.marca = response.data.marca;
      this.linea = response.data.linea;
      this.modelo = response.data.modelo;
      this.carroseria = response.data.carroseria;
      this.kilometraje = response.data.kilometraje;
      this.placa = response.data.placa;
      this.precio = response.data.precio;
     
      this.descripcion = response.data.descripcion;
      this.correo = response.data.correo;
      this.rol = response.data.rol; 
    })

    this.carsService.getimages(idVehicle).subscribe(res=>{
      this.imagenes=res.data;
      console.log(this.imagenes)
    })
    
    

    
    
  }
}
