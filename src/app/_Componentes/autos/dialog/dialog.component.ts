import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Approval } from 'src/app/_Modelos/cars';
import { CarsService } from 'src/app/_servicios/cars.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

 
  public aprovacion: boolean = true;

  constructor(public snackbar:MatSnackBar,public carsService: CarsService,public dialogRef:MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public idVehicle:number) {
   
   }

   close(){
    this.dialogRef.close();
  }

  Aprrove(){
    const approval:Approval={
      aprovacion:this.aprovacion
    };
    this.carsService.approvalOffer(this.idVehicle,approval).subscribe(response=>{ if(response.exito===1){
      this.dialogRef.close();
      this.snackbar.open('Oferta aprobada con exito','',{
        duration: 2000
      });
    }
  });


  }



  ngOnInit(): void {
    
  }

}
