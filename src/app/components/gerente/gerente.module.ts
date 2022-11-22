import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenteHomeComponent } from './gerente-home';
import { AppRoutingModuleCliente } from './app-routing-gerente';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GerenteHomeComponent],
  imports: [CommonModule, AppRoutingModuleCliente, FormsModule],
  exports: [AppRoutingModuleCliente],
  providers: [
    
  ]
})
export class GerenteModule {}
