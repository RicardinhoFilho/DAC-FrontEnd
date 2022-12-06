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

  contaCliente$: Observable<Conta> = new Observable<Conta>();
  contaCliente : Conta = new Conta();

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

    this.contaCliente$ = this.clienteService.buscarContaPorId(this.cliente.id!);
    this.contaCliente$.subscribe(cliente => {
      this.contaCliente = cliente;
    });
    
  }

  sacar() {
    if (
      this.formSaque.value.saque > this.contaCliente.saldo! + this.contaCliente.limite! && 
      this.formSaque.value.saque > 0
    ) {
      if(this.formSaque.value.saque <= 0)
        this.mensagem = `Informe um valor maior que zero para realizar saque!!!`;
      else
        this.mensagem = `Não pode realizar o saque. Seu saldo mais o limite é de : ${
          this.contaCliente.saldo! + this.contaCliente.limite!
        }`;
    } else {
      const transacao: Transacao = clienteHelper.formatarTransacao(
        this.transacaos.length + 2,
        this.contaCliente,
        this.formSaque.value.saque,
        2
      );
      const clienteAlterar: Conta = clienteHelper.formatarAlterarSaldoCliente(
        this.contaCliente,
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
