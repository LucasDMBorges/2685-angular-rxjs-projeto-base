import { ImageLinks } from './interface';

export class LivroVolumeInfo {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: Date;
  description?: string;
  previewLink?: string;
  thumbnail?: ImageLinks;

  constructor(book) {
    (this.title = book.volumeInfo?.title),
      (this.authors = book.volumeInfo?.authors),
      (this.publisher = book.volumeInfo?.publisher),
      (this.publishedDate = book.volumeInfo?.publishedDate),
      (this.description = book.volumeInfo?.description),
      (this.previewLink = book.volumeInfo?.previewLink),
      (this.thumbnail = book.volumeInfo?.imageLinks?.thumbnail);
  }
}
