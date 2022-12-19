import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CpfValidatorDirective } from './directives/cpf-validator.directive';
import { NumericoDirective } from './directives/numerico.directive';
import { CityService } from './services/city.service';
import { StateService } from './services/state.service';

@NgModule({
  declarations: [NumericoDirective, CpfValidatorDirective],
  imports: [CommonModule],
  exports: [NumericoDirective, CpfValidatorDirective],
  providers: [CityService, StateService],
})
export class SharedModule {}
