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
import { ClienteService } from '../services';
import clienteHelper from '../Utils/clienteHelper';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-cliente-transferencia',
  templateUrl: './cliente-transferencia.component.html',
  styleUrls: ['./cliente-transferencia.component.scss'],
})
export class ClienteTransferenciaComponent implements OnInit {
  formTransferencia: FormGroup;
  date = new FormControl(new Date());

  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  cliente$: Observable<User[]> = new Observable<User[]>();
  cliente: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.formTransferencia = this.formBuilder.group({
      valorTransferencia: new FormControl('', Validators.required),
      contaTransferencia: new FormControl('', Validators.required),
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

  transferir() {
    var transacao: Transacao = clienteHelper.formatarTransacao(
      this.transacaos.length + 2,
      this.cliente,
      this.formTransferencia.value.valorTransferencia,
      3,
      this.formTransferencia.value.contaTransferencia
    );
    let clienteAlterar: User = clienteHelper.formatarAlterarSaldoCliente(
      this.cliente,
      this.formTransferencia.value.valorTransferencia,
      3
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
