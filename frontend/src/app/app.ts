import { Component, inject, OnInit } from '@angular/core';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';
import { Card } from './components/card/card';
import { Drawer } from './components/drawer/drawer';
import { Book } from './types/book';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, Footer, Card, Drawer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  books: Book[] = [];

  private api = inject(Api);
  
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.api.getAll().subscribe((res: Book[]) => {
      this.books = res.sort((a, b) => a.title < b.title ? 0 : 1);
    });
  }

  loadBooksWithFilter(filter: string) {
    if (filter === "all") {
      this.loadBooks();
      return;
    }

    this.api.getAll().subscribe((res: Book[]) => {
      this.books = res
        .filter(book => {
          if (book.title.toLowerCase().includes(filter)) {
            return true;
          } else if(book.tags.find(tag => tag === filter)) {
            return true;
          }
          return false;
        })
        .sort((a, b) => a.title < b.title ? 0 : 1);
    });
  }
}
