import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Api } from '../../services/api';
import { Book } from '../../types/book';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css'
})
export class Drawer {
  private api = inject(Api);

  @Output() addEmmiter = new EventEmitter();

  open = false;
  headerImage: string = "";
  title: string = "";
  blogLink: string = "";
  playLink: string = "";
  tag: string = "";
  tags: string[] = [];
  finished: boolean = false;

  changeTag(event: any) {
    this.tag = event.target.value;
  }

  addTagButton() {
    const exist = this.tags.find(tag => tag === this.tag.toLowerCase());
    if (!exist) {
      this.tags.push(this.tag.toLowerCase());
      this.tag = "";
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  changeHeader(event: any) {
    this.headerImage = event.target.value;
  }

  changeTitle(event: any) {
    this.title = event.target.value;
  }

  changeBlog(event: any) {
    this.blogLink = event.target.value;
  }

  changePlay(event: any) {
    this.playLink = event.target.value;
  }

  changeFinished() {
    this.finished = !this.finished;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const newBook: Book = {
      id: uuidv4(),
      title: this.title,
      headerImage: this.headerImage,
      playLink: this.playLink,
      blogLink: this.blogLink,
      tags: this.tags,
      finished: this.finished
    };

    this.api.create(newBook).subscribe(res => {
      console.log('Item added successfully:', res);
      this.closeDrawer()
      this.addEmmiter.emit();
    },
    err => {
      console.error('Error adding item:', err);
    })
  }

  openDrawer() {
    this.open = true;
    document.querySelector("body")?.classList.add("no-scroll");
  }

  closeDrawer() {
    this.open = false;
    document.querySelector("body")?.classList.remove("no-scroll");
  }
}
