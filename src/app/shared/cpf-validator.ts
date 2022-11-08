import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidateCPF(control: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let cpf = control.value;
    if (typeof cpf !== 'string')
      return { invalidCPF: { value: control.value } };
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
      return { invalidCPF: { value: control.value } };
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
      : { invalidCPF: { value: control.value } };
  };
}
