import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';
import { Card } from './components/card/card';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, Footer, Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
