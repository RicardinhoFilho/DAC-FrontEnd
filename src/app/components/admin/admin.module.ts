import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRelatorioComponent } from './admin-relatorio/admin-relatorio.component';
import { AdminAdicionarGerenteComponent } from './admin-adicionar-gerente/admin-adicionar-gerente.component';
import { AdminRemoverGerenteComponent } from './admin-remover-gerente/admin-remover-gerente.component';
import { AdminListarGerenteComponent } from './admin-listar-gerente/admin-listar-gerente.component';
import { AdminEditarGerenteComponent } from './admin-editar-gerente/admin-editar-gerente.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminRelatorioComponent,
    AdminAdicionarGerenteComponent,
    AdminRemoverGerenteComponent,
    AdminListarGerenteComponent,
    AdminEditarGerenteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AdminModule { }
