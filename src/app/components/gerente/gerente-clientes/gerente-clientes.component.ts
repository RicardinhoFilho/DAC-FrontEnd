import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-gerente-clientes',
  templateUrl: './gerente-clientes.component.html',
  styleUrls: ['./gerente-clientes.component.scss'],
})
export class GerenteClientesComponent implements OnInit {
  clientes: User[] = [];

  clientes2 = [
    {
      id: 1,
      cpf: '03411614030',
      nome: 'Ricardo Filho',
      salario: '3000',
      ativo: true,
    },
    {
      id: 3,
      cpf: '11122233396',
      nome: 'Wagner Oliveira',
      salario: '8500',
      ativo: true,
    },

    {
      id: 4,
      cpf: '11122233396',
      nome: 'Henrrique Félix',
      salario: '7000',
      ativo: true,
    },

    {
      id: 5,
      cpf: '11122233396',
      nome: 'Douglas Zanela ',
      salario: '7000',
      ativo: false,
    },

    {
      id: 6,
      cpf: '11122233396',
      nome: 'Mario Eduardo Boareto',
      salario: '7000',
      ativo: false,
    },
  ];

  constructor(private clienteService: ClienteService) {
    this.getClientes();
  }

  ngOnInit(): void {}

  getClientes() {
    this.clienteService
      .getAll()
      .subscribe((clientes) => (this.clientes = clientes));
  }

  getClientesString() {
    return JSON.stringify(this.clientes);
  }
}
