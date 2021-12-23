import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, tap } from 'rxjs/operators';
import { StateManager } from '../../state-manager.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input() data: Array<any> = [];

  @Input() actions: boolean = false;
  @Input() newItems: boolean = true;

  /* NOTE:  */
  @Input() fields: Array<{ value: any, class: (v: any) => string, searchIn: boolean }>;

  @Output() navigate = new EventEmitter<any | null>();
  @Output() delete = new EventEmitter<any>();

  search = new FormControl('');

  filtered_data = [];

  constructor(public state: StateManager) { }

  ngOnChanges(changes: SimpleChanges): void {

    this.setFilter(this.search.value);

  }

  ngOnInit(): void {

    this.setFilter(this.search.value);

    this.search.valueChanges.subscribe((v) => {
      this.setFilter(v);
    });

    this.search.valueChanges
      .pipe(
        debounceTime(2000),
        startWith(''),
        tap(value => this.setFilter(value)),
      );
  }

  setFilter(search): void {

    this.filtered_data = this.data?.filter((item) => {

      let survived = false;

      const can_search_in_fields = this.fields.filter(v => v.searchIn);

      can_search_in_fields.forEach(field => {
        try {
          survived = survived || item[field.value].includes(search);
        } catch (error) {
          survived = true;
        }
      });

      return survived || can_search_in_fields.length === 0 || !search || search === '';
    });

  }

  open(item): void {
    this.navigate.emit(item);
  }

  delete_item(item): void {
    this.delete.emit(item);
  }

}
