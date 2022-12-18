import { Directive, OnInit } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[CpfValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CpfValidatorDirective,
      multi: true,
    },
  ],
})
export class CpfValidatorDirective implements Validator, OnInit {
  constructor() {}

  ngOnInit(): void {}

  validate(c: FormControl): { [key: string]: any } | null {
    let cpf = c.value;
    if (typeof cpf !== 'string') return { invalidCPF: true };
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
      return { invalidCPF: true };
    cpf = cpf.split('').map((el: string | number) => +el);
    const rest = (count: number) =>
      ((cpf
        .slice(0, count - 12)
        .reduce(
          (soma: number, el: number, index: number) =>
            soma + el * (count - index),
          0
        ) *
        10) %
        11) %
      10;
    return rest(10) === cpf[9] && rest(11) === cpf[10]
      ? null
      : { invalidCPF: true };
  }
}
