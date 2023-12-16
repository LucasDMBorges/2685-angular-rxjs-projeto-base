import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  listaLivros: [];

  query: string = '';

  constructor(private service: LivroService) {}

  findBooks() {
    this.service.find(this.query).subscribe((res) => console.log(res));
  }
}
