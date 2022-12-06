import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
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
  //@ViewChild('formUsuario') formTransferencia! : NgForm;
  date = new FormControl(new Date());

  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  contaCliente$: Observable<Conta> = new Observable<Conta>();
  contaCliente : Conta = new Conta();

  cliente!: Conta;
  contas: Conta[] = [];

  mensagem: string = '';

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
    this.clienteService.getAll().subscribe(contas => {
      this.contas = contas;
    });

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

  transferir() {
    if(this.formTransferencia.value.valorTransferencia <= 0) {
      this.mensagem = "O valor de transferencia deve ser maior que zero!!!!";
    } else if(this.contas.findIndex(conta => conta.id == this.formTransferencia.value.contaTransferencia) != -1) {
      var transacao: Transacao = clienteHelper.formatarTransacao(
        this.transacaos.length + 2,
        this.contaCliente,
        this.formTransferencia.value.valorTransferencia,
        3,
        this.formTransferencia.value.contaTransferencia
      );
      let clienteAlterar: User = clienteHelper.formatarAlterarSaldoCliente(
        this.contaCliente,
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
    } else {
        this.mensagem = `Conta do cliente para transferência não encontrado : ${
          this.formTransferencia.value.contaTransferencia
        }`;
    }  
  }
}
