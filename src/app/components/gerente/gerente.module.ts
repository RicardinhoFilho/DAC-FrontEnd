import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModuleCliente } from './app-routing-gerente';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from '../../angular-material.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModuleCliente,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AngularMaterialModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
  ],
})
export class GerenteModule {}
