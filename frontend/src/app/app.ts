import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';
import { Card } from './components/card/card';
import { Drawer } from './components/drawer/drawer';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, Footer, Card, Drawer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
