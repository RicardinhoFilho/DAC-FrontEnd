import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AngularMaterialModule } from '../../angular-material.module';
import { AppRoutingModuleCliente } from './app-routing-gerente';
import { GerenteClientesComponent } from './gerente-clientes/gerente-clientes.component';
import { GerenteHomeComponent } from './gerente-home/gerente-home.component';
import { GerenteMelhoresClientesComponent } from './gerente-melhores-clientes/gerente-melhores-clientes.component';
import { GerenteModalComponent } from './gerente-modal/gerente-modal.component';
import { GerentePesquisaComponent } from './gerente-pesquisa/gerente-pesquisa.component';
import { GerenteClienteDetalhesComponent } from './gerente-cliente-detalhes/gerente-cliente-detalhes.component';
@NgModule({
  declarations: [
    GerenteClientesComponent,
    GerenteHomeComponent,
    GerenteMelhoresClientesComponent,
    GerentePesquisaComponent,
    GerenteModalComponent,
    GerenteClienteDetalhesComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModuleCliente,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
  ],
})
export class GerenteModule {}
