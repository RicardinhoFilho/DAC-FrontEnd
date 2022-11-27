import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumericoDirective } from './directives/numerico.directive';

@NgModule({
  declarations: [
    NumericoDirective
  ],
  imports: [CommonModule],
})
export class SharedModule {}
