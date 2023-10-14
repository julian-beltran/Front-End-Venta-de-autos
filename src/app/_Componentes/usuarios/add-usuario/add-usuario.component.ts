import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/_servicios/usuarios.service';
import { usuario } from './../../../_Modelos/Usuarios';
import { Response } from './../../../_Modelos/response';


@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  public nombre: string;
  public apellido: string;
  public telefono: string;
  public ocupacion:string;
  public sexo:number;
  public direccion:string;
  public edad: number;

  constructor(public dialogRef:MatDialogRef<AddUsuarioComponent>, 
              public usuarioService:UsuariosService,
              public snackbar:MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public usuario: usuario 
              ) { 
                if (this.usuario !== null){
                  this.nombre=usuario.nombre;
                  this.apellido=usuario.apellido;
                  this.telefono=usuario.telefono;
                  this.ocupacion=usuario.ocupacion;
                  this.sexo=usuario.sexo;
                  this.direccion=usuario.direccion;
                  this.edad=usuario.edad;
                }
              }
  close(){
      this.dialogRef.close();
    }

  editUsuario(){
    const Usuario:usuario = {
      id:this.usuario.id,
      nombre:this.nombre,
      apellido:this.apellido,
      telefono: this.telefono,
      ocupacion:this.ocupacion,
      sexo: this.sexo,
      direccion:this.direccion,
      edad: this.edad

    };
    this.usuarioService.editUser(Usuario.id,Usuario).subscribe(response=>{
      if(response.exito===1){
        this.dialogRef.close();
        this.snackbar.open('Usuario editado con exito','',{
          duration: 2000
        });
      }
    })
  }  
  addUsuario(){
    const Usuario:usuario = {
      id:0,
      nombre:this.nombre,
      apellido:this.apellido,
      telefono: this.telefono,
      ocupacion:this.ocupacion,
      sexo: this.sexo,
      direccion:this.direccion,
      edad: this.edad

    };
    this.usuarioService.addUser(Usuario).subscribe(response=>{
      if(response.exito===1){
        this.dialogRef.close();
        this.snackbar.open('Usuario insertado con exito','',{
          duration: 2000
        });
      }
    })
  }
  ngOnInit(): void {
  }

}
