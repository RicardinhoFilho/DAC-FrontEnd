import { Component, OnInit } from '@angular/core';
import { UserService } from '@components/auth/services/user.service';
import { GerenteService } from '@components/gerente/services/gerente.service';
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
  contaCliente$: Observable<Conta> = new Observable<Conta>();
  contaCliente : Conta = new Conta();

  dadosUsuario: User = new User();
  cliente: Conta = new Conta();
  gerente: User = new User();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private clienteService: ClienteService,
    ) {
    this.cliente = this.authService.contaCliente;
  }

  ngOnInit(): void {
    this.userService.getGerentes().subscribe(gerentes => {
      this.gerente = gerentes.find(gerente => gerente.id == this.cliente.idGerente)!;
    });
    this.contaCliente$ = this.clienteService.buscarContaPorId(this.cliente.id!);
    this.contaCliente$.subscribe(cliente => {
      this.contaCliente = cliente;
    });

    this.userService.getAllUsers().subscribe(usuarios => {
      if(usuarios && this.contaCliente) {
        this.dadosUsuario = usuarios.find(usuario => usuario.id == this.contaCliente.idUsuario)!;
      }
    });
  }

  get usuarioLogado(): User {
    return this.authService.usuarioLogado;
  }
}
