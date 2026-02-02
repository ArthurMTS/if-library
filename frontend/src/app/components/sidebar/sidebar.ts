import {
  Component,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Api } from '../../services/api';
import { Book } from '../../types/book';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private readonly api = inject(Api);
  protected tags = signal<string[]>([]);
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
    this.tags.set(tgs.sort((a, b) => (a < b ? 0 : 1)));
  }

  onTagClick(tag: string) {
    this.filterEmitter.emit(tag.toLowerCase());
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.onTagClick(this.title());
  }

  onChangeTitleFilter(event: any) {
    this.title.set(event.target.value);
  }
}
