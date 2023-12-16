import { ResultBooks, VolumeInfo, ImageLinks } from './../../models/interface';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/interface';

import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listBoook: Book[];

  query: string = '';

  subscription: Subscription;

  book: Book;

  constructor(private service: LivroService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findBooks() {
    this.subscription = this.service.find(this.query).subscribe({
      next: (res) => (this.listBoook = this.formatResultBooks(res)),
      error: (err) => console.log(err),
    });
  }

  formatResultBooks(resultBooks): Book[] {
    const listBooks: Book[] = [];
    resultBooks.forEach((book) => {
      listBooks.push(
        (this.book = {
          title: book.volumeInfo?.title,
          authors: book.volumeInfo?.authors,
          publisher: book.volumeInfo?.publisher,
          publishedDate: book.volumeInfo?.publishedDate,
          description: book.volumeInfo?.description,
          previewLink: book.volumeInfo?.previewLink,
          thumbnail: book.volumeInfo?.ImageLinks?.thumbnail,
        })
      );
    });
    return listBooks;
  }
}
