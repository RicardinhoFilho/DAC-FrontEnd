import { Component, OnInit } from '@angular/core';
import { UserService } from '@components/auth/services/user.service';
import { Conta } from '@shared/models/conta.model';
import { User } from './../../../shared/models/user.model';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss'],
})
export class ClienteHomeComponent implements OnInit {
  dadosUsuario: User = new User();
  contaCliente: Conta = new Conta();
  gerente: User = new User();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.contaCliente = this.authService.contaCliente;

    this.userService
      .getGerenteById(this.contaCliente.idGerente!)
      .subscribe((gerente) => {
        this.gerente = gerente;
      });

    this.userService.getAllUsers().subscribe((usuarios) => {
      if (usuarios && this.contaCliente) {
        this.dadosUsuario = usuarios.find(
          (usuario) => usuario.id == this.contaCliente.idUsuario
        )!;
      }
    });
  }

  get usuarioLogado(): User {
    return this.authService.usuarioLogado;
  }
}
