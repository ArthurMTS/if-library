import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  private api = inject(Api);

  @Input() id!: string;
  @Input() finished!: boolean;
  @Input() headerImage!: string;
  @Input() title!: string;
  @Input() blogLink!: string;
  @Input() playLink!: string;
  @Input() tags!: string[];

  @Output() deleteEmmiter = new EventEmitter();

  delete(id: string) {
    const result = confirm("Delete book?");

    if (!result) return;

    this.api.delete(id).subscribe(res => {
      console.log("Resource deleted successfully!");
      this.deleteEmmiter.emit();
    },
    err => {
      console.error('Error deleting resource:', err);
    });
  }
}
