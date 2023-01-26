import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login } from './../../../shared/models/login.model';
import { User } from './../../../shared/models/user.model';

const LS_USER: string = 'user';
const LS_CONTA: string = 'conta';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${environment.url.auth}/login`;
  private logoutUrl = `${environment.url.auth}/logout`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<User> {
    return this.http.post<User>(
      this.loginUrl,
      JSON.stringify(login),
      this.httpOptions
    );
  }

  logout() {
    delete localStorage[LS_USER];
    delete localStorage[LS_CONTA];
  }
}
