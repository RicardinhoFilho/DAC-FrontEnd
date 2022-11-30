import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Conta } from './../../../shared/models/conta.model';

@Component({
  selector: 'app-gerente-pesquisa',
  templateUrl: './gerente-pesquisa.component.html',
  styleUrls: ['./gerente-pesquisa.component.scss'],
})
export class GerentePesquisaComponent implements OnInit {
  clientes: Conta[] = [];

  clientes_string: string = '';
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {}

  getClientes(cpf: string) {
    this.clienteService
      .search(cpf)
      .subscribe(
        (clientes: Conta[]) =>
          (this.clientes = clientes.filter((item: Conta) => item.ativo))
      );
  }

  getClientesString() {
    return JSON.stringify(this.clientes);
  }
}
