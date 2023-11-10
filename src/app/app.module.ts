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
import { ApproveCarComponent } from './_Componentes/autos/approve-car/approve-car.component';

import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ApproveComponent } from './_Componentes/autos/approve/approve.component';
import { GalleriaModule } from 'primeng/galleria';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import { DialogComponent } from './_Componentes/autos/dialog/dialog.component';
import { MensajeComponent } from './_Componentes/mensaje/mensaje.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { DialogSalesComponent } from './_Componentes/ventas/dialog-sales/dialog-sales.component';
import { ApproveCarTrueComponent } from './_Componentes/autos/approve-car-true/approve-car-true.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ShoplistComponent } from './_Componentes/shops/shoplist/shoplist.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { FilterModeloPipe } from './_pipes/filter-modelo.pipe';
import { FilterCarroseriaPipe } from './_pipes/filter-carroseria.pipe';
import { OffersComponent } from './_Componentes/offers/offers.component';
import { EditComponent } from './_Componentes/offers/edit/edit.component';
import { DeleteComponent } from './_Componentes/offers/delete/delete.component';
import { SaleslistComponent } from './_Componentes/ventas/saleslist/saleslist.component';
import { PqrsComponent } from './_Componentes/pqrs/pqrs.component';
import { GetpqrsComponent } from './_Componentes/pqrs/getpqrs/getpqrs.component';
import { UsersComponent } from './_Componentes/users/users.component';
import { EditUserComponent } from './_Componentes/users/edit-user/edit-user.component';






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
    AddAutosComponent,
    ApproveCarComponent,
    ApproveComponent,
    DialogComponent,
    MensajeComponent,
    DialogSalesComponent,
    ApproveCarTrueComponent,
    ShoplistComponent,
    FilterPipe,
    FilterModeloPipe,
    FilterCarroseriaPipe,
    OffersComponent,
    EditComponent,
    DeleteComponent,
    SaleslistComponent,
    PqrsComponent,
    GetpqrsComponent,
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    GalleriaModule,
    CarouselModule,
    ButtonModule,
    NgxPayPalModule,
    NgxPaginationModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi:true},
    ConfirmationService, MessageService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
