import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTag } from './filter-tag';

describe('FilterTag', () => {
  let component: FilterTag;
  let fixture: ComponentFixture<FilterTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
