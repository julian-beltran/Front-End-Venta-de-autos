import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/_servicios/usuarios.service';
import { Response } from '../../_Modelos/response';
import { MatDialog } from '@angular/material/dialog';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { usuario } from 'src/app/_Modelos/Usuarios';
import { DeleteUsuarioComponent } from '../delete-usuario/delete-usuario.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public name: string="";
  public lst: any[];
  public display:string[]=['id','nombre','apellido','telefono','ocupacion','sexo','direccion','edad','acciones']
  constructor(private usuariosService :UsuariosService,
              public dialog:MatDialog,
              public snackBar:MatSnackBar,
              private userStore: UserStoreService, 
              public authServicesService:AuthServicesService) {}

  ngOnInit(): void {
    this.userStore.getnameFromStore().subscribe(val=>{
      let nameFromToken = this.authServicesService.getNameFromToken();
      this.name = val || nameFromToken
    })
    this.getUsuarios();
  }
  getUsuarios(){
    this.usuariosService.getUsers().subscribe(response=>{
      this.lst=response.data;
  })}
  openadd(){
    const dialogRef= this.dialog.open(AddUsuarioComponent,{
      width:'300'
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getUsuarios()
    });
  }

  openEdit(usuario:usuario){
    const dialogRef= this.dialog.open(AddUsuarioComponent,{
      width:'500',
      data:usuario
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getUsuarios()
    });
  }

  openDelete(usuario:usuario){
    const dialogRef= this.dialog.open(DeleteUsuarioComponent,{
      width:'500',
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.usuariosService.deleteUser(usuario.id).subscribe(response=> {
          if(response.exito === 1) {
            this.snackBar.open('Cliente eliminado con exito','',{
              duration: 2000
            });
            
      this.getUsuarios()
          }
        });
      }
    });
  }

}
