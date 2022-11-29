import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '@shared/models/state.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private apiUrl = 'http://localhost:3000/estados/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllStates(): Observable<State[]> {
    return this.http.get<State[]>(this.apiUrl, this.httpOptions);
  }

  getStateById(id: number): Observable<State | undefined> {
    return this.http.get<State>(this.apiUrl + id, this.httpOptions);
  }
}
