import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AngularMaterialModule } from './../../angular-material.module';
import { AdminAddEditGerenteComponent } from './admin-add-edit-gerente/admin-add-edit-gerente.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminListarGerenteComponent } from './admin-listar-gerente/admin-listar-gerente.component';
import { AdminRelatorioComponent } from './admin-relatorio/admin-relatorio.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminRelatorioComponent,
    AdminListarGerenteComponent,
    AdminAddEditGerenteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    AngularMaterialModule,
  ],
})
export class AdminModule {}
