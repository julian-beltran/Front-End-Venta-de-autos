import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_Componentes/home/home.component';
import { UsuariosComponent } from './_Componentes/usuarios/usuarios.component';
import { AuthGuard } from './_Security/auth.guard';
import { LoginComponent } from './_Componentes/login/login.component';
import { LogUpComponent } from './_Componentes/log-up/log-up.component';
import { AutosComponent } from './_Componentes/autos/autos.component';
import { ResetPasswordComponent } from './_Componentes/reset-password/reset-password.component';
import { AddAutosComponent } from './_Componentes/autos/add-autos/add-autos.component';
import { ApproveCarComponent } from './_Componentes/autos/approve-car/approve-car.component';
import { ApproveComponent } from './_Componentes/autos/approve/approve.component';
import { MensajeComponent } from './_Componentes/mensaje/mensaje.component';
import { ApproveCarTrueComponent } from './_Componentes/autos/approve-car-true/approve-car-true.component';
import { ShoplistComponent } from './_Componentes/shops/shoplist/shoplist.component';
import { OffersComponent } from './_Componentes/offers/offers.component';
import { EditComponent } from './_Componentes/offers/edit/edit.component';
import { SaleslistComponent } from './_Componentes/ventas/saleslist/saleslist.component';
import { PqrsComponent } from './_Componentes/pqrs/pqrs.component';
import { GetpqrsComponent } from './_Componentes/pqrs/getpqrs/getpqrs.component';
import { UsersComponent } from './_Componentes/users/users.component';
import { EditUserComponent } from './_Componentes/users/edit-user/edit-user.component';



const routes: Routes = [
  // {path: '', redirectTo: '/Inicio',pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '',component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'Inicio', component : HomeComponent, canActivate: [AuthGuard]},
  {path: 'Usuarios', component : UsuariosComponent, canActivate: [AuthGuard]},
  {path: 'Autos', component : AutosComponent, canActivate: [AuthGuard]},
  {path: 'AgregarAuto', component: AddAutosComponent,canActivate:[AuthGuard]},
  {path: 'AprovarAutos', component: ApproveCarComponent,canActivate:[AuthGuard]},
  {path: 'AutosAprovados', component: ApproveCarTrueComponent,canActivate:[AuthGuard]},
  {path: 'Oferta/:idVehicle',component: ApproveComponent,canActivate:[AuthGuard]},
  {path: 'EditOferta/:idVehicle',component: EditComponent,canActivate:[AuthGuard]},
  {path: 'Mensajes',component: MensajeComponent,canActivate:[AuthGuard]},
  {path: 'MisCompras',component: ShoplistComponent,canActivate:[AuthGuard]},
  {path: 'MisVentas',component: SaleslistComponent,canActivate:[AuthGuard]},
  {path: 'MisOfertas',component: OffersComponent,canActivate:[AuthGuard]},
  {path: 'Pqrs', component : PqrsComponent, canActivate: [AuthGuard]},
  {path: 'MisPqrs', component : GetpqrsComponent, canActivate: [AuthGuard]},
  {path: 'MiPerfil', component : UsersComponent, canActivate: [AuthGuard]},
  {path: 'EditarPerfil/:id', component : EditUserComponent, canActivate: [AuthGuard]},
  {path: 'Registro', component: LogUpComponent},
  {path: 'login', component: LoginComponent },
  {path: 'reset', component:ResetPasswordComponent}
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
