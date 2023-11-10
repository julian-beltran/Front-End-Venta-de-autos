import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesFormat } from 'src/app/_Modelos/sales';
import { usuario } from './../../../_Modelos/Usuarios';

@Component({
  selector: 'app-dialog-sales',
  templateUrl: './dialog-sales.component.html',
  styleUrls: ['./dialog-sales.component.css']
})
export class DialogSalesComponent implements OnInit {
  name:string;
  value:string;
  usuario:string;
  constructor(public snackbar:MatSnackBar,public dialogRef:MatDialogRef<DialogSalesComponent>,@Inject(MAT_DIALOG_DATA) public sales:SalesFormat) { 
    if(this.sales !== null){
      this.name = sales.name;
      this.value = sales.value;
      this.usuario = sales.usuario;
    }
  }

  ngOnInit(): void {
  }

}
