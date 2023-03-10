import { Injectable } from '@angular/core';
import { Login } from './../../../shared/models/login.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from './user.service';

const LS_USER: string = 'user';
const LS_CONTA: string = 'conta';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get usuarioLogado(): User {
    return localStorage[LS_USER] ? JSON.parse(localStorage[LS_USER]) : null;
  }

  public set usuarioLogado(usuario: User) {
    localStorage[LS_USER] = JSON.stringify(usuario);
  }

  public get contaCliente(): User {
    return localStorage[LS_CONTA] ? JSON.parse(localStorage[LS_CONTA]) : null;
  }

  public set contaCliente(usuario: User) {
    localStorage[LS_CONTA] = JSON.stringify(usuario);
  }

  constructor(private userService: UserService) {}

  async login(login: Login) {
    // login
  }

  logout() {
    delete localStorage[LS_USER];
    delete localStorage[LS_CONTA];
  }
}
