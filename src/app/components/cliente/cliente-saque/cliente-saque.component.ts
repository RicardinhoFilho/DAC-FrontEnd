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
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-cliente-saque',
  templateUrl: './cliente-saque.component.html',
  styleUrls: ['./cliente-saque.component.scss'],
})
export class ClienteSaqueComponent implements OnInit {
  formSaque: FormGroup;
  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  cliente$: Observable<User[]> = new Observable<User[]>();
  cliente: Conta[] = [];

  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
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

    this.cliente$ = this.clienteService.buscarSaldoPorId(123);
    this.cliente$.subscribe((cliente: Conta[]) => {
      this.cliente = cliente;
    });
  }

  sacar() {
    if (
      this.formSaque.value.saque >
      this.cliente[0].saldo! + this.cliente[0].limite!
    ) {
      this.mensagem = `Não pode realizar o saque. Seu saldo mais o limite é de : ${
        this.cliente[0].saldo! + this.cliente[0].limite!
      }`;
    } else {
      var transacao: Transacao = clienteHelper.formatarTransacao(
        this.transacaos.length + 2,
        this.cliente,
        this.formSaque.value.saque,
        2
      );
      let clienteAlterar: User = clienteHelper.formatarAlterarSaldoCliente(
        this.cliente,
        this.formSaque.value.saque,
        2
      );

      this.clienteService.postTransacao(transacao).subscribe(() => {
        this.clienteService
          .atualizarSaldoCliente(clienteAlterar)
          .subscribe(() => {
            this.router.navigate(['/cliente/home']);
          });
      });
    }
  }
}
