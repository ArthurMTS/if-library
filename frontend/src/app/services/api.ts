import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Book } from '../types/book';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Book[]>(environment.apiUrl);
  }

  create(newBook: Book) {
    return this.http.post<Book>(environment.apiUrl, newBook);
  }

  delete(id: string) {
    return this.http.delete<Book>(environment.apiUrl + "\\" + id);
  }
}
