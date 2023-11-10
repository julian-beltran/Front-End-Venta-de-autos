import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { imagenes } from 'src/app/_Modelos/imagenes';
import { CarsService } from 'src/app/_servicios/cars.service';
import { SaleState } from 'src/app/_Modelos/cars';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Mensaje } from 'src/app/_Modelos/mensaje';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { SalesFormat, SalesPost } from 'src/app/_Modelos/sales';
import { DialogSalesComponent } from '../../ventas/dialog-sales/dialog-sales.component';
import { SaleService } from './../../../_servicios/sale.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/Vfs_fonts';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
pdfMake.vfs =pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  public role: string="";
  public usuario:string="";
  public idname:string="";
  public payPalConfig ? : IPayPalConfig;
  stateSale: boolean = true;

  constructor(private barraProgresoService: BarraDeProgresoService,
              private userStore: UserStoreService,
              public authServicesService:AuthServicesService,
              private route: ActivatedRoute,public carsService: CarsService,
              public dialog:MatDialog,private fb:FormBuilder,
              private router:Router,
              private saleService:SaleService,
              public snackbar:MatSnackBar) {
    this.userStore.getRolFromStore().subscribe(val=>{
      const rolFromToken = this.authServicesService.getRoleFromToken();
      this.role = val || rolFromToken
    })

    this.userStore.getnameFromStore().subscribe(val=>{
      const nameFromToken = this.authServicesService.getNameFromToken();
      this.usuario = val || nameFromToken
    })

    this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
    })
   }

  idVehicle:number;
  aprovacion: boolean;
  estadoCompra:boolean;
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
  fecha:Date;
  imagenes:any[];
  category:string[];
  PrecioDolar:number;
  
  

  responsiveOptions: any[] | undefined;


  ngOnInit(): void {
    this.barraProgresoService.progressBarReactiva.next(false);
    this.route.params.subscribe((params:Params)=>{
      
      const idVehicle =params['idVehicle'];
      this.loadOfferInfo(idVehicle);
      this.barraProgresoService.progressBarReactiva.next(true);
    });


  this.initConfig();
  }

  loadOfferInfo(idVehicle:number){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.carsService.getOffer(idVehicle).subscribe(response=>{
      
      this.idVehicle = response.data.idVehicle;
      this.aprovacion = response.data.aprovacion;
      this.estadoCompra = response.data.estadoCompra;
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
      this.fecha =response.data.fecha
      this.descripcion = response.data.descripcion;
      this.correo = response.data.correo;
      this.rol = response.data.rol;
      this.category=[this.marca,this.linea]; 
      this.PrecioDolar=this.precio*0.00025;
      this.barraProgresoService.progressBarReactiva.next(true);
    })
    this.barraProgresoService.progressBarReactiva.next(false);
    this.carsService.getimages(idVehicle).subscribe(res=>{
      this.imagenes=res.data;
      this.barraProgresoService.progressBarReactiva.next(true);
    }) 
  }

  openDialog(id:number){
    this.barraProgresoService.progressBarReactiva.next(false);
    const dialogRef= this.dialog.open(DialogComponent,{
      width:'300',
      data:id
    });
    this.barraProgresoService.progressBarReactiva.next(true);
  }

  public messageForm = this.fb.group({
    nombre:['', Validators.required],
    apellido:['', Validators.required],
    telefono:['', Validators.required],
    email:['', Validators.required],
    pregunta:['', Validators.required],
  });

  Message(){
    this.barraProgresoService.progressBarReactiva.next(false);
    let mensaje:Mensaje={
      ...this.messageForm.value
    };
    mensaje.idPersona=this.idPersona;
    mensaje.idVehiculo=this.idVehicle;
    console.log(mensaje)
    this.carsService.addMessage(mensaje).subscribe(response=>{
      if(response.exito === 1){
        alert(response.mensaje);
        this.barraProgresoService.progressBarReactiva.next(true);
      }else{
      alert(response.mensaje);
      this.barraProgresoService.progressBarReactiva.next(true);
      }
    })

  }

  openDialogSales(sales:SalesFormat){
    this.barraProgresoService.progressBarReactiva.next(false);
    const dialogRef= this.dialog.open(DialogSalesComponent,{
      width:'300',
      data:sales
    });
    this.barraProgresoService.progressBarReactiva.next(true);
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AU9VuM-GY_oUZKIr_TlCz1_Y_JkkZtg1qT56WTR9SCyBxn10LfcgYzMGJA0_PFPFvCOC2dIuFWwhsL9A',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.PrecioDolar.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.PrecioDolar.toString()
                        }
                    }
                },
                items: [{
                    name: this.category.toString(),
                    quantity: '1',
                    unit_amount: {
                        currency_code: 'USD',
                        value: this.PrecioDolar.toString(),
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
          this.barraProgresoService.progressBarReactiva.next(false);
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            console.log(data.payer.name.given_name,data.payer.name.surname)
            let sales:SalesFormat={};
            let salepost:SalesPost={};
            sales.name =data.purchase_units[0].description
            sales.value =data.purchase_units[0].amount.value
            sales.nombreTitular = data.payer.name.given_name;
            sales.apellidoTitular = data.payer.name.surname;
            sales.correoPaypal = data.payer.email_address;
            sales.usuario = this.usuario
            salepost.idCliente= Number(this.idname);
            salepost.idVehiculo =this.idVehicle;
            salepost.idPago = 1
            salepost.nombreTitular =data.payer.name.given_name;
            salepost.apellidoTitular = data.payer.name.surname;
            salepost.correoPaypal = data.payer.email_address;
            this.saleService.addSales(salepost).subscribe({
              next:(Response)=>{
              if(Response.exito===1){
                alert(Response.mensaje);
                
              }else{
              alert(Response.mensaje);
              }
            }
          });
          const state:SaleState={
            estadoCompra:this.stateSale
          };
          this.carsService.SaleStateOffer(this.idVehicle,state).subscribe(response=>{ if(response.exito===1){
            this.snackbar.open('el vehiculo fue enviado a su lista de comprados','',{
              duration: 2000
            });
            this.barraProgresoService.progressBarReactiva.next(false);
          }
        });
            this.openDialogSales(sales);
            this.router.navigate(["/Inicio"]);
            

        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            
        },
        onError: err => {
            console.log('OnError', err);
            
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
           
        }
    };
}
createPdf(){
  const pdfDefinition:any={
    content: [
      {text: 'Datos del Vendedor', style: 'header'},
      {
        ul: [
          this.category.toString(),
          this.telefono,
          this.correo,
          this.direccion
        ]
      },
      {text: '    ', style: 'header'},
      {text: 'Datos del vehiculo', style: 'header'},
      {
        ul: [
          this.marca,
          this.linea,
          this.modelo.toString(),
          this.carroseria,
          this.kilometraje,
          this.placa,
          this.precio,
          this.descripcion
        ]
      }
    ]
  }
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();
}
}
