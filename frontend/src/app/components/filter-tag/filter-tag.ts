import { Component, input, output } from '@angular/core';

@Component({
  selector: 'filter-tag',
  imports: [],
  templateUrl: './filter-tag.html',
  styleUrl: './filter-tag.css',
})
export class FilterTag {
  tag = input.required<string>();
  active = input.required<boolean>();
  tagClickEmitter = output<string>();

  onTagClick(tag: string) {
    this.tagClickEmitter.emit(tag);
  }
}
