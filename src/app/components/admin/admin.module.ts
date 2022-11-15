import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRelatorioComponent } from './admin-relatorio/admin-relatorio.component';
import { AdminAdicionarGerenteComponent } from './admin-adicionar-gerente/admin-adicionar-gerente.component';
import { AdminRemoverGerenteComponent } from './admin-remover-gerente/admin-remover-gerente.component';
import { AdminListarGerenteComponent } from './admin-listar-gerente/admin-listar-gerente.component';
import { AdminEditarGerenteComponent } from './admin-editar-gerente/admin-editar-gerente.component';



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
    CommonModule
  ]
})
export class AdminModule { }
