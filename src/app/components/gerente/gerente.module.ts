import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenteHomeComponent } from './gerente-home';
import { AppRoutingModuleCliente } from './app-routing-gerente';

@NgModule({
  declarations: [GerenteHomeComponent],
  imports: [CommonModule, AppRoutingModuleCliente],
  exports: [AppRoutingModuleCliente],
})
export class GerenteModule {}
