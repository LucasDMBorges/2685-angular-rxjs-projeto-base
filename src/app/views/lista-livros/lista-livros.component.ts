import { FormControl } from '@angular/forms';
import { Item, Livro } from './../../models/interface';
import { Component } from '@angular/core';
import { Subscription, debounceTime, filter, map, switchMap } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.find(valorDigitado)),
    map((items) => this.formatarResultado(items))
  );

  formatarResultado(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
