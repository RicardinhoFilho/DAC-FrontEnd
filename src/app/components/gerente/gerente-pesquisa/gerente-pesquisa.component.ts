import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Cliente } from '@components/cliente/Utils/Cliente';

@Component({
  selector: 'app-gerente-pesquisa',
  templateUrl: './gerente-pesquisa.component.html',
  styleUrls: ['./gerente-pesquisa.component.scss'],
})
export class GerentePesquisaComponent implements OnInit {
  clientes: Cliente[] = [];

  clientes_string: string = '';
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {}

  getClientes(cpf: string) {
    this.clienteService
      .search(cpf)
      .subscribe(
        (clientes) => (this.clientes = clientes.filter((item) => item.ativo))
      );
  }

  getClientesString() {
    return JSON.stringify(this.clientes);
  }
}
