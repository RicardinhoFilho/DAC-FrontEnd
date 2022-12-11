import { Component, OnInit } from '@angular/core';
import { AuthService } from '@components/auth/services/auth.service';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { User } from '@shared/models/user.model';
import { Conta } from './../../../shared/models/conta.model';
interface IClienteCompleto {
  conta: Conta;
  cliente: User;
}
@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss'],
})
export class GerenteHomeComponent implements OnInit {
  clientes: IClienteCompleto[] = [];

  constructor(
    private contaService: ClienteService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.getContas();
  }

  ngOnInit(): void {}

  getContas() {
    this.contaService
      .getClientesByGerente(this.authService.usuarioLogado.id!)
      .subscribe((contas: Conta[]) =>
        contas.map((item) => {
          this.userService
            .getUserById(item.idUsuario!)
            .subscribe((user: User) => {
              this.clientes.push({ conta: item, cliente: user });
            });
        })
      );
  }

  getContasString() {
    return JSON.stringify(this.clientes);
  }
}
