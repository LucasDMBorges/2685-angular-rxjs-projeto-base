import { FormControl } from '@angular/forms';
import { Item, Livro, Resposta } from './../../models/interface';
import { Component } from '@angular/core';
import {
  Subscription,
  catchError,
  debounceTime,
  filter,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  mensagemErro = '';

  livrosResultado: Resposta;

  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.find(valorDigitado)),
    map((resultado) => (this.livrosResultado = resultado)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.formatarResultado(items)),
    catchError((erro) => {
      console.log(erro);
      return throwError(
        () => new Error((this.mensagemErro = 'Ops, ocorreu um erro'))
      );
    })
  );

  formatarResultado(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
