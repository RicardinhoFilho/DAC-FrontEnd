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
import { AuthService } from './../../auth/services/auth.service';

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

  cliente!: Conta;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private authService: AuthService,
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

    this.cliente = this.authService.contaCliente;
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
        .atualizarContaCliente(clienteAlterar)
        .subscribe(() => {
          this.router.navigate(['/cliente/home']);
        });
    });
  }
}
