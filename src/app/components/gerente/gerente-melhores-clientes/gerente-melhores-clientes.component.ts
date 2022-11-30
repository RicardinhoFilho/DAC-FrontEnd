import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Conta } from './../../../shared/models/conta.model';

@Component({
  selector: 'app-gerente-melhores-clientes',
  templateUrl: './gerente-melhores-clientes.component.html',
  styleUrls: ['./gerente-melhores-clientes.component.scss'],
})
export class GerenteMelhoresClientesComponent implements OnInit {
  clientes: Conta[] = [];

  clientes_string: string = '';
  constructor(private clienteService: ClienteService) {
    this.getClientes();
  }

  ngOnInit(): void {}

  getClientes() {
    this.clienteService
      .getMelhores()
      .subscribe(
        (clientes: Conta[]) =>
          (this.clientes = clientes.filter((item: Conta) => item.ativo))
      );
  }

  getClientesString() {
    return JSON.stringify(this.clientes);
  }
}
