import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Conta } from '@shared/models/conta.model';
import { User } from '@shared/models/user.model';
import { lastValueFrom, map, of } from 'rxjs';
import { concatAll, last } from 'rxjs/operators';
import { ValidateCPF } from '../..//shared/cpf-validator';
import { City } from './../../shared/models/city.model';
import { State } from './../../shared/models/state.model';
import { CityService } from './../../shared/services/city.service';
import { StateService } from './../../shared/services/state.service';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  states!: State[];
  cities!: City[];

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private stateService: StateService,
    private userService: UserService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/
        ),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/
        ),
      ]),
      role: new FormControl('User', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
        Validators.minLength(14),
        Validators.maxLength(14),
        ValidateCPF,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
        ),
      ]),
      salary: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl({ value: '', disabled: true }, Validators.required),
      cep: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d{2}\.)\d{3}\-\d{3}$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl(''),
    });
  }

  ngOnInit() {
    this.stateService
      .getAllStates()
      .subscribe((states: State[]) => (this.states = states));
  }

  async register(): Promise<void> {
    let invalidUser: boolean = false;
    await lastValueFrom(
      this.userService.getUserByCPF(this.form.get('cpf')?.value).pipe(
        map((users: User[]) => {
          if (users.length > 0) {
            invalidUser = true;
            confirm('CPF já foi utilizado!');
          }
        })
      )
    );
    await lastValueFrom(
      this.userService.getUserByEmail(this.form.get('email')?.value).pipe(
        map((users: User[]) => {
          if (users.length > 0) {
            invalidUser = true;
            confirm('Email já foi utilizado!');
          }
        })
      )
    );
    if (invalidUser) return;

    const user = new User();
    user.nome = this.form.get('name')?.value;
    user.senha = this.form.get('password')?.value;
    user.email = this.form.get('email')?.value;
    user.cargo = 'cliente';
    user.cpf = this.form.get('cpf')?.value;
    user.telefone = this.form.get('phone')?.value;
    user.estado = this.form.get('state')?.value;
    user.cidade = this.form.get('city')?.value;
    user.cep = this.form.get('cep')?.value;
    user.rua = this.form.get('street')?.value;
    user.numero = this.form.get('number')?.value;
    user.complemento = this.form.get('complement')?.value;

    this.userService.inserir(user).subscribe(() => {
      let user: User;
      let gerentes: User[];
      let menorGerente: User;

      const $getUserByCpfObservable = this.userService
        .getUserByCPF(this.form.get('cpf')?.value)
        .pipe(map((usuarios: User[]) => (user = usuarios[0])));
      const $getGerentesObservable = this.userService
        .getGerentes()
        .pipe(map((users: User[]) => (gerentes = users)));
      const $getMenorGerenteObservable = this.clienteService.getAll().pipe(
        map((contas: Conta[]) => {
          let menorConta: Number;
          gerentes.map((gerente: User) => {
            let count = contas.filter(
              (conta: Conta) => conta.idGerente === gerente.id
            ).length;
            if (!menorConta || count < menorConta) {
              menorGerente = gerente;
            }
          });
        })
      );

      const tasks$ = of(
        $getUserByCpfObservable,
        $getGerentesObservable,
        $getMenorGerenteObservable
      );

      tasks$.pipe(concatAll(), last()).subscribe({
        next: () => {
          const conta = new Conta();
          conta.idUsuario = user.id;
          conta.data = new Date();
          conta.salario = +this.form.get('salary')?.value;
          if (conta.salario > 2000)
            conta.limite = +this.form.get('salary')?.value / 2;
          conta.ativo = false;
          conta.saldo = 0;
          conta.idGerente = menorGerente.id;

          this.clienteService.inserir(conta).subscribe(() => {
            confirm('Conta criada com sucesso!');
            this.router.navigate(['/login']);
          });
        },
        error: () => {
          // send email to user
        },
      });
    });
  }

  cpfChange(): void {
    let cpfValue: string = this.form.value.cpf;
    let numeric = cpfValue.replace(/[^0-9]+/g, '');
    let cpfLength = numeric.length;

    let partOne = numeric.slice(0, 3) + '.';
    let partTwo = numeric.slice(3, 6) + '.';
    let partThree = numeric.slice(6, 9) + '-';

    if (cpfLength < 4) {
      this.form.controls['cpf'].setValue(numeric);
    } else if (cpfLength >= 4 && cpfLength < 7) {
      let formatCPF = partOne + numeric.slice(3);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 7 && cpfLength < 10) {
      let formatCPF = partOne + partTwo + numeric.slice(6);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 10 && cpfLength < 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9, 11);
      this.form.controls['cpf'].setValue(formatCPF);
    }
  }

  cepChange(): void {
    let cepValue: string = this.form.value.cep;
    let numeric = cepValue.replace(/[^0-9]+/g, '');
    let cepLength = numeric.length;

    let partOne = numeric.slice(0, 2) + '.';
    let partTwo = numeric.slice(2, 5) + '-';

    if (cepLength < 2) {
      this.form.controls['cep'].setValue(numeric);
    } else if (cepLength >= 3 && cepLength < 6) {
      let formatCEP = partOne + numeric.slice(2);
      this.form.controls['cep'].setValue(formatCEP);
    } else if (cepLength >= 6) {
      let formatCPF = partOne + partTwo + numeric.slice(5, 8);
      this.form.controls['cep'].setValue(formatCPF);
    }
  }

  phoneChange(): void {
    let phoneValue: string = this.form.value.phone;
    let numeric = phoneValue.replace(/[^0-9]+/g, '');
    let phoneLength = numeric.length;

    let partOne = '(' + numeric.slice(0, 2) + ') ';
    let partTwo = numeric.slice(2, 7) + '-';

    if (phoneLength < 2) {
      this.form.controls['phone'].setValue(numeric);
    } else if (phoneLength >= 3 && phoneLength < 6) {
      let formatPhone = partOne + numeric.slice(2);
      this.form.controls['phone'].setValue(formatPhone);
    } else if (phoneLength >= 6) {
      let formatPhone = partOne + partTwo + numeric.slice(7, 11);
      this.form.controls['phone'].setValue(formatPhone);
    }
  }

  fillCities($event: any): void {
    this.cityService
      .getCitiesByStateId(+this.form.get('state')?.value)
      .subscribe((cities: City[]) => {
        this.form.get('city')?.enable();
        this.cities = cities;
      });
  }

  get passwordsMatch(): boolean {
    return (
      this.form.get('password')?.value ===
      this.form.get('passwordConfirmation')?.value
    );
  }
}
