import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, ResultBooks } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  query = 'Angular';

  constructor(private http: HttpClient) {}

  find(query?: string): Observable<Item[]> {
    if (query) this.query = query;
    const params = new HttpParams().append('q', this.query);

    return this.http.get<ResultBooks>(this.API, { params }).pipe(
      tap((retornoApi) => console.log(retornoApi)),
      map((resultado) => resultado.items)
    );
  }
}
