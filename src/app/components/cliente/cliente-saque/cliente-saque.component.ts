import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModel, Transacao } from '@shared/models';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';
import { Cliente } from '../Utils/Cliente';

@Component({
  selector: 'app-cliente-saque',
  templateUrl: './cliente-saque.component.html',
  styleUrls: ['./cliente-saque.component.scss']
})
export class ClienteSaqueComponent implements OnInit {

  formSaque: FormGroup;
  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  cliente$: Observable<Cliente[]> = new Observable<Cliente[]>();
  cliente: Cliente[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.formSaque= this.formBuilder.group({
    saque: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.transacaos$ = this.clienteService.getAllTransacaos();
    this.transacaos$.subscribe( item => {
      this.transacaos = item;
    })

    this.cliente$ = this.clienteService.buscarSaldoPorId(123);
    this.cliente$.subscribe(cliente => {
      this.cliente = cliente;
    })
  }

  sacar() {
    var transacao: Transacao = new Transacao();
    transacao.id = this.transacaos.length + 2;
    transacao.idCliente = this.cliente[0].id;
    transacao.tipoTransacao = 2;   //TODO, fazer tipo enum, 1 deposito, 2 saque, 3 transferencia, 4 recebendo transferencia
    transacao.valorTransacao = this.formSaque.value.saque;
    transacao.saldo = this.cliente[0].saldo - this.formSaque.value.saque;
    transacao.data = new Date();

    let clienteAlterar: ClienteModel = new ClienteModel();
    clienteAlterar.id = this.cliente[0].id;
    clienteAlterar.cpf = this.cliente[0].cpf;
    clienteAlterar.ativo = this.cliente[0].ativo;
    clienteAlterar.limite = this.cliente[0].limite;
    clienteAlterar.nome = this.cliente[0].nome;
    clienteAlterar.salario = this.cliente[0].salario;
    clienteAlterar.saldo = this.cliente[0].saldo - this.formSaque.value.saque;

    this.clienteService.postTransacao(transacao).subscribe(transacao => {
      this.clienteService.atualizarSaldoCliente(clienteAlterar).subscribe(cliente => {
        this.router.navigate(["/cliente/home"]);
      });
    })
  }

}
