import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css'
})
export class Drawer {
  open = false;

  openDrawer() {
    this.open = true;
    document.querySelector("body")?.classList.add("no-scroll");
  }

  closeDrawer() {
    this.open = false;
    document.querySelector("body")?.classList.remove("no-scroll");
  }
}
