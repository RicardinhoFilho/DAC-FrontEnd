import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModel, Transacao } from '@shared/models';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../Utils/Cliente';

@Component({
  selector: 'app-cliente-depositar',
  templateUrl: './cliente-depositar.component.html',
  styleUrls: ['./cliente-depositar.component.scss']
})
export class ClienteDepositarComponent implements OnInit {
  form: FormGroup;

  cliente$: Observable<Cliente[]> = new Observable<Cliente[]>();
  cliente: Cliente[] = [];

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
    this.transacaos$.subscribe( item => {
      this.transacaos = item;
    });

    this.cliente$ = this.clienteService.buscarSaldoPorId(123);
    this.cliente$.subscribe(cliente => {
      this.cliente = cliente;
    })

  }

  depositar() {
    var transacao: Transacao = new Transacao();
    transacao.id = this.transacaos.length + 2;
    transacao.idCliente = this.cliente[0].id; 
    transacao.tipoTransacao = 1;   //TODO, fazer tipo enum, 1 deposito, 2 saque, 3 transferencia, 4 recebendo transferencia
    transacao.valorTransacao = this.form.value.deposito;
    transacao.saldo = this.cliente[0].saldo + this.form.value.deposito;
    transacao.data = new Date();

    let clienteAlterar: ClienteModel = new ClienteModel();
    clienteAlterar.id = this.cliente[0].id;
    clienteAlterar.cpf = this.cliente[0].cpf;
    clienteAlterar.ativo = this.cliente[0].ativo;
    clienteAlterar.limite = this.cliente[0].limite;
    clienteAlterar.nome = this.cliente[0].nome;
    clienteAlterar.salario = this.cliente[0].salario;
    clienteAlterar.saldo = this.cliente[0].saldo + this.form.value.deposito;

    this.clienteService.postTransacao(transacao).subscribe(transacao => {
      this.clienteService.atualizarSaldoCliente(clienteAlterar).subscribe(cliente => {
        this.router.navigate(["/cliente/home"]);
      });
    })
    
  }

}
