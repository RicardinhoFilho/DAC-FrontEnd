import { Component, OnInit } from '@angular/core';
import { Conta } from '@shared/models/conta.model';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/user.model';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss'],
})
export class ClienteHomeComponent implements OnInit {
  cliente$: Observable<Conta[]> = new Observable<Conta[]>();
  cliente: Conta = new Conta();

  constructor(private authService: AuthService) {
    this.cliente = this.authService.contaCliente;
  }

  ngOnInit(): void {}

  get usuarioLogado(): User {
    return this.authService.usuarioLogado;
  }
}
