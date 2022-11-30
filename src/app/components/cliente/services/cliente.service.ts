import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transacao } from '@shared/models';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/user.model';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes';
  private apiUrlTransacaos = 'http://localhost:3000/transacaos';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAll(): Observable<User[]> {
    const list = this.http.get<User[]>(this.apiUrl);

    return list;
  }

  getPendentes(): Observable<User[]> {
    //pagaria a rota especifica dos pendentes como nao temos usaremos logica no componente
    return this.http.get<User[]>(this.apiUrl);
  }
  //Rota especifica já irá filtrar para nós
  getMelhores(): Observable<User[]> {
    const list = this.http.get<User[]>(this.apiUrl);

    return list;
  }

  search(cpf: string): Observable<User[]> {
    const list = this.http.get<User[]>(this.apiUrl + '?cpf=' + cpf);

    return list;
  }

  getAllTransacaos(): Observable<Transacao[]> {
    const lista = this.http.get<Transacao[]>(this.apiUrlTransacaos);
    return lista;
  }

  postTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(
      this.apiUrlTransacaos,
      JSON.stringify(transacao),
      this.httpOptions
    );
  }

  buscarSaldoPorId(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '?id=' + id, this.httpOptions);
  }

  atualizarSaldoCliente(cliente: User): Observable<User> {
    return this.http.put<User>(
      this.apiUrl + '/' + cliente.id,
      JSON.stringify(cliente),
      this.httpOptions
    );
  }
}
