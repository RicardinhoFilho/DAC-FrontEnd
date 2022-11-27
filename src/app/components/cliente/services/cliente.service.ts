import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../Utils/Cliente';
import { ClienteModel, Transacao } from '@shared/models';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes';
  private apiUrlTransacaos = 'http://localhost:3000/transacaos';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<Cliente[]> {
    const list = this.http.get<Cliente[]>(this.apiUrl);

    return list;
  }

  getPendentes(): Observable<Cliente[]> {
    //pagaria a rota especifica dos pendentes como nao temos usaremos logica no componente
    return this.http.get<Cliente[]>(this.apiUrl);
  }
  //Rota especifica já irá filtrar para nós
  getMelhores(): Observable<Cliente[]> {
    const list = this.http.get<Cliente[]>(this.apiUrl);

    return list;
  }

  search(cpf:string): Observable<Cliente[]> {
    const list = this.http.get<Cliente[]>(this.apiUrl+'?cpf='+cpf);

    return list;
  }

  getAllTransacaos(): Observable<Transacao[]> {
    const lista = this.http.get<Transacao[]>(this.apiUrlTransacaos);
    return lista;
  }

  postTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrlTransacaos, JSON.stringify(transacao), this.httpOptions);
  }

  buscarSaldoPorId(id: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl + "?id=" + id, this.httpOptions);
  }

  atualizarSaldoCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(this.apiUrl + "/" + cliente.id, JSON.stringify(cliente), this.httpOptions);
  }

}
