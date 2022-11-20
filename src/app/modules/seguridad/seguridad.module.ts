import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SeguridadModule { }
