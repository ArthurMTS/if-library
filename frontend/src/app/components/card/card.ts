import {
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  private readonly api = inject(Api);

  readonly id = input.required<string>();
  readonly finished = input.required<boolean>();
  readonly headerImage = input.required<string>();
  readonly title = input.required<string>();
  readonly blogLink = input.required<string>();
  readonly playLink = input.required<string>();
  readonly tags = input.required<string[]>();

  protected readonly deleteEmmiter = output();

  delete(id: string) {
    const result = confirm('Delete book?');

    if (!result) return;

    this.api.delete(id).subscribe(
      (res) => {
        console.log('Resource deleted successfully!');
        this.deleteEmmiter.emit();
      },
      (err) => {
        console.error('Error deleting resource:', err);
      },
    );
  }
}
