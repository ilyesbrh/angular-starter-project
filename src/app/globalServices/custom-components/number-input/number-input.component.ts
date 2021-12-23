import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {

  @Input() value: number;
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  setValue(value) {
    this.value = value;
    if (this.value < 0) this.value = 0;
    this.valueChange.emit(this.value);
  }

}
