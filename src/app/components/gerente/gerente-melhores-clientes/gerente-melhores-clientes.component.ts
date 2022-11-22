import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Cliente } from '@components/cliente/Utils/Cliente';

@Component({
  selector: 'app-gerente-melhores-clientes',
  templateUrl: './gerente-melhores-clientes.component.html',
  styleUrls: ['./gerente-melhores-clientes.component.scss'],
})
export class GerenteMelhoresClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  clientes_string: string = '';
  constructor(private clienteService: ClienteService) {
    this.getClientes();
  }

  ngOnInit(): void {}

  getClientes() {
    this.clienteService
      .getMelhores()
      .subscribe(
        (clientes) => (this.clientes = clientes.filter((item) => item.ativo))
      );
  }

  getClientesString(){
    return JSON.stringify(this.clientes);
  }
}
