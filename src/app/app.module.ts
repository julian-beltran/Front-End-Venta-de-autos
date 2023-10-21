import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_Componentes/home/home.component';
import { UsuariosComponent } from './_Componentes/usuarios/usuarios.component';
import { MaterialModule } from './_Material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddUsuarioComponent } from './_Componentes/usuarios/add-usuario/add-usuario.component';
import { DeleteUsuarioComponent } from './_Componentes/delete-usuario/delete-usuario.component';
import { LoginComponent } from './_Componentes/login/login.component';
import { JwtInterceptor } from './_Security/jwt.interceptor';
import { LogUpComponent } from './_Componentes/log-up/log-up.component';
import { AutosComponent } from './_Componentes/autos/autos.component';
import { PassworForgetComponent } from './_Componentes/login/passwor-forget/passwor-forget.component';
import { ResetPasswordComponent } from './_Componentes/reset-password/reset-password.component';
import { AddAutosComponent } from './_Componentes/autos/add-autos/add-autos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuariosComponent,
    AddUsuarioComponent,
    DeleteUsuarioComponent,
    LoginComponent,
    LogUpComponent,
    AutosComponent,
    PassworForgetComponent,
    ResetPasswordComponent,
    AddAutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
