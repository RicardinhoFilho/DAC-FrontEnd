import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModel, Transacao } from '@shared/models';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';
import { Cliente } from '../Utils/Cliente';
import clienteHelper from '../Utils/clienteHelper';

@Component({
  selector: 'app-cliente-transferencia',
  templateUrl: './cliente-transferencia.component.html',
  styleUrls: ['./cliente-transferencia.component.scss']
})
export class ClienteTransferenciaComponent implements OnInit {

  formTransferencia: FormGroup;
  date = new FormControl(new Date());

  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  transacaos: Transacao[] = [];

  cliente$: Observable<Cliente[]> = new Observable<Cliente[]>();
  cliente: Cliente[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.formTransferencia = this.formBuilder.group({
    valorTransferencia: new FormControl('', Validators.required),
    contaTransferencia: new FormControl('', Validators.required)
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

  transferir() {
    var transacao: Transacao = clienteHelper.formatarTransacao(
      this.transacaos.length + 2, this.cliente, this.formTransferencia.value.valorTransferencia, 3, this.formTransferencia.value.contaTransferencia
    );
    let clienteAlterar: ClienteModel = clienteHelper.formatarAlterarSaldoCliente(this.cliente, this.formTransferencia.value.valorTransferencia, 3);

    this.clienteService.postTransacao(transacao).subscribe(transacao => {
      this.clienteService.atualizarSaldoCliente(clienteAlterar).subscribe(cliente => {
        this.router.navigate(["/cliente/home"]);
      });
    })
  }

}
