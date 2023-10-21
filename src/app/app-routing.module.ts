import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_Componentes/home/home.component';
import { UsuariosComponent } from './_Componentes/usuarios/usuarios.component';
import { AuthGuard } from './_Security/auth.guard';
import { LoginComponent } from './_Componentes/login/login.component';
import { LogUpComponent } from './_Componentes/log-up/log-up.component';
import { AutosComponent } from './_Componentes/autos/autos.component';
import { ResetPasswordComponent } from './_Componentes/reset-password/reset-password.component';

const routes: Routes = [
  // {path: '', redirectTo: '/Inicio',pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '',component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'Inicio', component : HomeComponent, canActivate: [AuthGuard]},
  {path: 'Usuarios', component : UsuariosComponent, canActivate: [AuthGuard]},
  {path: 'Autos', component : AutosComponent, canActivate: [AuthGuard]},
  {path: 'Registro', component: LogUpComponent},
  {path: 'login', component: LoginComponent },
  {path: 'reset', component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
