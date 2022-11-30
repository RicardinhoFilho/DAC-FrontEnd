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

  cliente!: Conta;

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
  }

  depositar() {
    var transacao: Transacao = clienteHelper.formatarTransacao(
      this.transacaos.length + 2,
      this.cliente,
      this.form.value.deposito,
      1
    );
    let clienteAlterar: Conta = clienteHelper.formatarAlterarSaldoCliente(
      this.cliente,
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
  }
}
