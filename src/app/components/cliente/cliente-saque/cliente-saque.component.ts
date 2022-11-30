import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Transacao } from '@shared/models';
import { Conta } from '@shared/models/conta.model';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';
import clienteHelper from '../Utils/clienteHelper';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-cliente-saque',
  templateUrl: './cliente-saque.component.html',
  styleUrls: ['./cliente-saque.component.scss'],
})
export class ClienteSaqueComponent implements OnInit {
  formSaque: FormGroup;
  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  cliente!: Conta;

  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {
    this.formSaque = this.formBuilder.group({
      saque: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.transacaos$ = this.clienteService.getAllTransacaos();
    this.transacaos$.subscribe((item: Transacao[]) => {
      this.transacaos = item;
    });

    this.cliente = this.authService.contaCliente;
  }

  sacar() {
    if (
      this.formSaque.value.saque >
      this.cliente.saldo! + this.cliente.limite!
    ) {
      this.mensagem = `Não pode realizar o saque. Seu saldo mais o limite é de : ${
        this.cliente.saldo! + this.cliente.limite!
      }`;
    } else {
      const transacao: Transacao = clienteHelper.formatarTransacao(
        this.transacaos.length + 2,
        this.cliente,
        this.formSaque.value.saque,
        2
      );
      const clienteAlterar: Conta = clienteHelper.formatarAlterarSaldoCliente(
        this.cliente,
        this.formSaque.value.saque,
        2
      );

      this.clienteService.postTransacao(transacao).subscribe(() => {
        this.clienteService
          .atualizarContaCliente(clienteAlterar)
          .subscribe(() => {
            this.router.navigate(['/cliente/home']);
          });
      });
    }
  }
}
