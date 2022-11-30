import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Login } from './../../../shared/models/login.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from './user.service';

const LS_CHAVE: string = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get usuarioLogado(): User {
    return localStorage[LS_CHAVE] ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: User) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  constructor(private userService: UserService) {}

  async login(login: Login): Promise<User | undefined> {
    let user: User | undefined;
    await lastValueFrom(
      this.userService.getAllUsers().pipe(
        map((users: User[]) => {
          user = users.find(
            (user: User) =>
              user.email === login.login && user.senha === login.senha
          );
        })
      )
    );
    return user;
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }
}
