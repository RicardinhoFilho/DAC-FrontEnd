import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../Utils/Cliente';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

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
}
