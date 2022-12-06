import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { Transacao } from '@shared/models';
import { Conta } from '@shared/models/conta.model';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import clienteHelper from '../Utils/clienteHelper';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-cliente-depositar',
  templateUrl: './cliente-depositar.component.html',
  styleUrls: ['./cliente-depositar.component.scss'],
})
export class ClienteDepositarComponent implements OnInit {
  form: FormGroup;

  mensagem: string = '';
  cliente!: Conta;

  contaCliente$: Observable<Conta> = new Observable<Conta>();
  contaCliente : Conta = new Conta();

  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      deposito: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.transacaos$ = this.clienteService.getAllTransacaos();
    this.transacaos$.subscribe((item: Transacao[]) => {
      this.transacaos = item;
    });

    this.cliente = this.authService.contaCliente;

    this.contaCliente$ = this.clienteService.buscarContaPorId(this.cliente.id!);
    this.contaCliente$.subscribe(cliente => {
      this.contaCliente = cliente;
    });
  }

  depositar() {
    if (this.form.value.deposito > 0) {
      var transacao: Transacao = clienteHelper.formatarTransacao(
        this.transacaos.length + 2,
        this.contaCliente,
        this.form.value.deposito,
        1
      );
      let clienteAlterar: Conta = clienteHelper.formatarAlterarSaldoCliente(
        this.contaCliente,
        this.form.value.deposito,
        1
      );

      this.clienteService.postTransacao(transacao).subscribe(() => {
        this.clienteService
          .atualizarContaCliente(clienteAlterar)
          .subscribe(() => {
            this.router.navigate(['/cliente/home']);
          });
      });
    } else {
      this.mensagem = `O valor de deposito deve ser maior que zero!!!`;
    }
  }
}
