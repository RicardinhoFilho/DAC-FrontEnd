import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AdminModule } from './admin';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente';
import { GerenteModule } from './gerente/gerente.module';

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    CommonModule,
    ClienteModule,
    GerenteModule,
    AdminModule,
    SharedModule,
    AuthModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
