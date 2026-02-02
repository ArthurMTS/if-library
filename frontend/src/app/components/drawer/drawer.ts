import { Component, inject, output, signal } from '@angular/core';
import { Api } from '../../services/api';
import { Book } from '../../types/book';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawer {
  protected open = signal(false);
  protected headerImage = signal('');
  protected title = signal('');
  protected blogLink = signal('');
  protected playLink = signal('');
  protected tag = signal('');
  protected tags = signal<string[]>([]);
  protected finished = signal(false);

  private readonly api = inject(Api);
  protected readonly addEmmiter = output();

  changeTag(event: any) {
    this.tag.set(event.target.value);
  }

  addTagButton() {
    const exist = this.tags().find((tag) => tag === this.tag().toLowerCase());
    if (!exist) {
      const t: string[] = this.tags();
      t.push(this.tag().toLowerCase());
      this.tags.set(t);
      this.tag.set('');
    }
  }

  removeTag(tag: string) {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }

  changeHeader(event: any) {
    this.headerImage.set(event.target.value);
  }

  changeTitle(event: any) {
    this.title.set(event.target.value);
  }

  changeBlog(event: any) {
    this.blogLink.set(event.target.value);
  }

  changePlay(event: any) {
    this.playLink.set(event.target.value);
  }

  changeFinished() {
    this.finished.update((finished) => !finished);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const newBook: Book = {
      id: uuidv4(),
      title: this.title(),
      headerImage: this.headerImage(),
      playLink: this.playLink(),
      blogLink: this.blogLink(),
      tags: this.tags(),
      finished: this.finished(),
    };

    this.api.create(newBook).subscribe(
      (res) => {
        console.log('Item added successfully:', res);
        this.closeDrawer();
        this.addEmmiter.emit();
      },
      (err) => {
        console.error('Error adding item:', err);
      },
    );
  }

  openDrawer() {
    this.open.set(true);
    document.querySelector('body')?.classList.add('no-scroll');
  }

  closeDrawer() {
    this.open.set(false);
    document.querySelector('body')?.classList.remove('no-scroll');
  }
}
