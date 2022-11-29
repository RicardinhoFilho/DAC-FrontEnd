import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumericoDirective } from './directives/numerico.directive';
import { CityService } from './services/city.service';
import { StateService } from './services/state.service';

@NgModule({
  declarations: [NumericoDirective],
  imports: [CommonModule],
  exports: [NumericoDirective],
  providers: [CityService, StateService],
})
export class SharedModule {}
