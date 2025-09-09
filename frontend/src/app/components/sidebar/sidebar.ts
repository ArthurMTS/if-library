import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Api } from '../../services/api';
import { Book } from '../../types/book';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private api = inject(Api);

  tags: string[] = [];
  title: string = "";

  @Output() filterEmitter = new EventEmitter();

  ngOnInit(): void {
    this.loadTag();
  }

  loadTag() {
    this.tags = [];
    this.api.getAll().subscribe((res: Book[]) => {
      res.forEach((book: Book) => {
        book.tags.forEach((tag: string) => {
          if (!this.tags.find((t) => t === tag)) {
            this.tags.push(tag);
          }
        });
      });
      this.tags = this.tags.sort((a, b) => a < b ? 0 : 1);
    });
  }

  onTagClick(tag: string) {
    this.filterEmitter.emit(tag.toLowerCase());
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.onTagClick(this.title);
  }

  onChangeTitleFilter(event: any) {
    this.title = event.target.value;
  }
}
