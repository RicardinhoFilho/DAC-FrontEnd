import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transacao } from '@shared/models';
import { Conta } from '@shared/models/conta.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/contas';
  private apiUrlTransacaos = 'http://localhost:3000/transacaos';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  inserir(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(
      this.apiUrl,
      JSON.stringify(conta),
      this.httpOptions
    );
  }

  getAll(): Observable<Conta[]> {
    const list = this.http.get<Conta[]>(this.apiUrl);

    return list;
  }

  getPendentes(): Observable<Conta[]> {
    //pagaria a rota especifica dos pendentes como nao temos usaremos logica no componente
    return this.http.get<Conta[]>(this.apiUrl);
  }
  //Rota especifica já irá filtrar para nós
  getMelhores(): Observable<Conta[]> {
    const list = this.http.get<Conta[]>(this.apiUrl);

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

  buscarContaPorId(id: number): Observable<Conta> {
    return this.http.get<Conta>(this.apiUrl + '/' + id, this.httpOptions);
  }

  buscarContaPorUserId(id: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(
      this.apiUrl + '?idUsuario=' + id,
      this.httpOptions
    );
  }

  atualizarContaCliente(cliente: Conta): Observable<Conta> {
    return this.http.put<Conta>(
      this.apiUrl + '/' + cliente.id,
      JSON.stringify(cliente),
      this.httpOptions
    );
  }

  getClientesByGerente(idGerente: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(
      this.apiUrl + '?idGerente=' + idGerente,
      this.httpOptions
    );
  }
}
