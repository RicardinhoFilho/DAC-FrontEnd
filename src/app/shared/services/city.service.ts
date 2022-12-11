import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@shared/models/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'http://localhost:3000/cidades';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl, this.httpOptions);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(this.apiUrl + '/' + id, this.httpOptions);
  }

  getCitiesByStateId(id: number): Observable<City[]> {
    return this.http.get<City[]>(
      this.apiUrl + '?estado=' + id,
      this.httpOptions
    );
  }
}
