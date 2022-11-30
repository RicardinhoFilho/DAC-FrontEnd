import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Conta } from './../../../shared/models/conta.model';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss'],
})
export class GerenteHomeComponent implements OnInit {
  clientes: Conta[] = [];

  constructor(private clienteService: ClienteService) {
    this.getClientes();
  }

  ngOnInit(): void {}

  getClientes() {
    this.clienteService
      .getPendentes()
      .subscribe(
        (clientes: Conta[]) =>
          (this.clientes = clientes.filter((item: Conta) => !item.ativo))
      );
  }

  getClientesString() {
    return JSON.stringify(this.clientes);
  }
}
