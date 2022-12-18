import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@components/auth/services/auth.service';
import { UserService } from '@components/auth/services/user.service';
import { City } from '@shared/models/city.model';
import { Conta } from '@shared/models/conta.model';
import { State } from '@shared/models/state.model';
import { User } from '@shared/models/user.model';
import { CityService } from '@shared/services/city.service';
import { StateService } from '@shared/services/state.service';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ClienteService } from '../services';

@Component({
  selector: 'app-cliente-alterar',
  templateUrl: './cliente-alterar.component.html',
  styleUrls: ['./cliente-alterar.component.scss'],
})
export class ClienteAlterarComponent implements OnInit {
  cliente!: Conta;
  contaCliente$: Observable<Conta> = new Observable<Conta>();
  contaCliente: Conta = new Conta();
  dadosUsuario: User = new User();

  form: FormGroup;
  states!: State[];
  cities!: City[];

  cidade: number = 0;
  estado: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private stateService: StateService,
    private userService: UserService,
    private clienteService: ClienteService,
    private router: Router,
    private authService: AuthService
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
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
        ),
      ]),
      salary: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
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
    this.cliente = this.authService.contaCliente;

    this.contaCliente$ = this.clienteService.buscarContaPorId(this.cliente.id!);
    this.contaCliente$.subscribe((cliente) => {
      this.contaCliente = cliente;
    });

    this.userService.getAllUsers().subscribe((usuarios) => {
      if (usuarios && this.contaCliente) {
        this.dadosUsuario = usuarios.find(
          (usuario) => usuario.id == this.contaCliente.idUsuario
        )!;
        this.cidade = this.dadosUsuario.cidade!;
        this.estado = this.dadosUsuario.estado!;
        this.preencherCampos();
      }
    });

    this.stateService
      .getAllStates()
      .subscribe((states: State[]) => (this.states = states));
  }

  async register(): Promise<void> {
    let invalidUser: boolean = false;
    await lastValueFrom(
      this.userService.getUserByEmail(this.form.get('email')?.value).pipe(
        map((users: User[]) => {
          if (
            users.length > 0 &&
            this.form.get('email')?.value != this.dadosUsuario.email
          ) {
            invalidUser = true;
            confirm('Email já foi utilizado!');
          }
        })
      )
    );
    if (invalidUser) return;

    if (this.contaCliente.saldo! < 0) {
      let saldo = this.contaCliente.saldo! * -1;
      let limite = +this.form.get('salary')?.value / 2;
      if (saldo > limite) this.contaCliente.limite = saldo;
      else this.contaCliente.limite = +this.form.get('salary')?.value / 2;
    } else this.contaCliente.limite = +this.form.get('salary')?.value / 2;

    this.contaCliente.salario = +this.form.get('salary')?.value;

    const atualizarUser = new User();
    atualizarUser.id = this.contaCliente.idUsuario;
    atualizarUser.nome = this.form.get('name')?.value;
    atualizarUser.senha = this.form.get('password')?.value;
    atualizarUser.email = this.form.get('email')?.value;
    atualizarUser.cargo = 'cliente';
    atualizarUser.cpf = this.dadosUsuario.cpf;
    atualizarUser.telefone = this.form.get('phone')?.value;
    atualizarUser.estado = this.form.get('state')?.value;
    atualizarUser.cidade = this.form.get('city')?.value;
    atualizarUser.cep = this.form.get('cep')?.value;
    atualizarUser.rua = this.form.get('street')?.value;
    atualizarUser.numero = this.form.get('number')?.value;
    atualizarUser.complemento = this.form.get('complement')?.value;

    this.clienteService
      .atualizarContaCliente(this.contaCliente)
      .subscribe(() => {
        this.userService.atualizarUser(atualizarUser).subscribe(() => {
          console.log('passou');
          this.router.navigate(['/cliente/home']);
        });
      });
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

  fillCities($event?: any): void {
    this.cityService
      .getCitiesByStateId(+this.form.get('state')?.value)
      .subscribe((cities: City[]) => {
        this.form.get('city')?.enable();
        this.cities = cities;
        this.form.get('city')?.setValue(this.cidade);
      });
  }

  preencherCampos() {
    this.cityService
      .getCitiesByStateId(this.dadosUsuario.estado!)
      .subscribe((cities: City[]) => {
        this.form.get('city')?.enable();
        this.cities = cities;
        this.form.get('city')?.setValue(this.dadosUsuario.cidade!);
      });
    this.form.get('name')?.setValue(this.dadosUsuario.nome);
    this.form.get('email')?.setValue(this.dadosUsuario.email);
    this.form.get('password')?.setValue(this.dadosUsuario.senha);
    this.form.get('passwordConfirmation')?.setValue(this.dadosUsuario.senha);
    this.form.get('phone')?.setValue(this.dadosUsuario.telefone);
    this.form.get('salary')?.setValue(this.contaCliente.salario);
    this.form.get('cep')?.setValue(this.dadosUsuario.cep);
    this.form.get('street')?.setValue(this.dadosUsuario.rua);
    this.form.get('number')?.setValue(this.dadosUsuario.numero);
    this.form.get('complement')?.setValue(this.dadosUsuario.complemento);
  }

  get passwordsMatch(): boolean {
    return (
      this.form.get('password')?.value ===
      this.form.get('passwordConfirmation')?.value
    );
  }

  get usuarioLogado(): User {
    return this.authService.usuarioLogado;
  }
}
