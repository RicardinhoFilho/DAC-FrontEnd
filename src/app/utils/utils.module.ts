import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from './../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UtilsModule {}
