import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Cliente } from '@components/cliente/Utils/Cliente';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss'],
})
export class GerenteHomeComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {
    this.getClientes();
  }

  ngOnInit(): void {}

  getClientes() {
    this.clienteService
      .getPendentes()
      .subscribe(
        (clientes: Cliente[]) =>
          (this.clientes = clientes.filter((item: Cliente) => !item.ativo))
      );
  }

  getClientesString() {
    return JSON.stringify(this.clientes);
  }
}
