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
    this.api.getAll().subscribe((res: any) => {
      this.books = res;
    });
  }
}
