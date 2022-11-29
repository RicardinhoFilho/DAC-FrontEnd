import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModel, Transacao } from '@shared/models';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';
import { Cliente } from '../Utils/Cliente';
import clienteHelper from '../Utils/clienteHelper';

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

  mensagem: string = "";

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
    if(this.formSaque.value.saque > this.cliente[0].saldo + this.cliente[0].limite) {
      this.mensagem = `Não pode realizar o saque. Seu saldo mais o limite é de : ${this.cliente[0].saldo + this.cliente[0].limite}`;
    } else {
      var transacao: Transacao = clienteHelper.formatarTransacao(this.transacaos.length + 2, this.cliente, this.formSaque.value.saque, 2);
      let clienteAlterar: ClienteModel = clienteHelper.formatarAlterarSaldoCliente(this.cliente, this.formSaque.value.saque, 2);

      this.clienteService.postTransacao(transacao).subscribe(transacao => {
        this.clienteService.atualizarSaldoCliente(clienteAlterar).subscribe(cliente => {
          this.router.navigate(["/cliente/home"]);
        });
      })
    }
  }

}
