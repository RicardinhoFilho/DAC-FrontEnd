import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Transacao } from '@shared/models';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import clienteHelper from '../Utils/clienteHelper';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-cliente-depositar',
  templateUrl: './cliente-depositar.component.html',
  styleUrls: ['./cliente-depositar.component.scss'],
})
export class ClienteDepositarComponent implements OnInit {
  form: FormGroup;

  cliente$: Observable<User[]> = new Observable<User[]>();
  cliente: User[] = [];

  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
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

    this.cliente$ = this.clienteService.buscarSaldoPorId(123);
    this.cliente$.subscribe((cliente: User[]) => {
      this.cliente = cliente;
    });
  }

  depositar() {
    var transacao: Transacao = clienteHelper.formatarTransacao(
      this.transacaos.length + 2,
      this.cliente,
      this.form.value.deposito,
      1
    );
    let clienteAlterar: User = clienteHelper.formatarAlterarSaldoCliente(
      this.cliente,
      this.form.value.deposito,
      1
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
