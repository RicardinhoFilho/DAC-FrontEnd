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
  dadosUsuario!: User;
  contaCliente!: Conta;
  gerente!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.contaCliente = this.authService.contaCliente;

    this.userService
      .getUserById(this.contaCliente.idGerente!)
      .subscribe((gerente) => {
        this.gerente = gerente;
      });

    this.userService
      .getUserById(this.contaCliente.idUsuario!)
      .subscribe((usuario: User) => {
        this.dadosUsuario = usuario;
      });
  }

  get usuarioLogado(): User {
    return this.authService.usuarioLogado;
  }
}
