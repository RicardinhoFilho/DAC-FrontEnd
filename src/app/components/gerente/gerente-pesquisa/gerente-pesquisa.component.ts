import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Conta } from './../../../shared/models/conta.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../auth/services/user.service';
@Component({
  selector: 'app-gerente-pesquisa',
  templateUrl: './gerente-pesquisa.component.html',
  styleUrls: ['./gerente-pesquisa.component.scss'],
})
export class GerentePesquisaComponent implements OnInit {
  cliente!: Conta;

  clientes_string: string = '';
  constructor(
    private clienteService: ClienteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  getClientes(cpf: string) {
    this.userService.getUserByCPF(cpf).subscribe((users: User[]) => {
      if (users.length === 0) {
        confirm('Nenhum usuário encontrado!');
        return;
      }
      this.clienteService
        .buscarContaPorId(users[0].id!)
        .subscribe((cliente: Conta) => (this.cliente = cliente));
    });
  }

  getClientesString() {
    return JSON.stringify(this.cliente);
  }
}
