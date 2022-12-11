import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, this.httpOptions);
  }

  getGerentes(): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrl + '?cargo=gerente',
      this.httpOptions
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + id, this.httpOptions);
  }

  inserir(usuario: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrl,
      JSON.stringify(usuario),
      this.httpOptions
    );
  }

  atualizarUser(usuario: User): Observable<User> {
    return this.http.put<User>(
      this.apiUrl + '/' + usuario.id,
      JSON.stringify(usuario),
      this.httpOptions
    );
  }

  remover(id: number): Observable<User> {
    return this.http.delete<User>(this.apiUrl + '/' + id, this.httpOptions);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrl + '?email=' + email,
      this.httpOptions
    );
  }

  getUserByCPF(cpf: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '?cpf=' + cpf, this.httpOptions);
  }
}
