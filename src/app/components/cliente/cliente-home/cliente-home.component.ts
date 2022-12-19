import { Component, OnInit } from '@angular/core';
import { UserService } from '@components/auth/services/user.service';
import { Conta } from '@shared/models/conta.model';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';
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
  
  contaCliente$: Observable<Conta> = new Observable<Conta>();
  cliente: Conta = new Conta();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private clienteService: ClienteService,
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

    this.contaCliente$ = this.clienteService.buscarContaPorId(this.contaCliente.id!);
    this.contaCliente$.subscribe(cliente => {
      this.contaCliente = cliente;
    });
  }

  get usuarioLogado(): User {
    return this.authService.usuarioLogado;
  }
}
