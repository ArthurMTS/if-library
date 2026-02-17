import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Api } from '../../services/api';
import { Book } from '../../types/book';
import { FilterTag } from '../filter-tag/filter-tag';

@Component({
  selector: 'app-filter',
  imports: [FilterTag],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter implements OnInit {
  private readonly api = inject(Api);
  protected tags = signal<string[]>([]);
  protected activeFilter = signal('');
  protected title = signal('');

  protected readonly filterEmitter = output<string>();

  ngOnInit(): void {
    this.loadTag();
  }

  loadTag() {
    const tgs: string[] = [];
    this.api.getAll().subscribe((res: Book[]) => {
      res.forEach((book: Book) => {
        book.tags.forEach((tag: string) => {
          if (!tgs.find((t) => t === tag)) {
            tgs.push(tag);
          }
        });
      });
    });
    this.tags.set(tgs.sort((a, b) => (a < b ? 1 : 0)));
  }

  onTagClick(tag: string) {
    this.activeFilter.set(tag);
    this.filterEmitter.emit(tag);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.onTagClick(this.title());
  }

  onChangeTitleFilter(event: any) {
    this.title.set(event.target.value);
  }
}
