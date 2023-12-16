import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, Resposta } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  find(query?: string): Observable<Resposta> {
    const params = new HttpParams().append('q', query);

    return this.http.get<Resposta>(this.API, { params });
  }
}
