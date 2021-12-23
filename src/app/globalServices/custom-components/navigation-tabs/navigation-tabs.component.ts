import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss']
})
export class NavigationTabsComponent implements OnInit {

  @Input() tabs: Array<string>;

  @Input() index: number;
  @Output() indexChange = new EventEmitter<number>();

  leftOffset = '-1 px';
  width = '50 px';
  constructor() { }

  ngOnInit(): void {
  }

  setIndex(index, element: HTMLElement) {

    this.index = index;
    this.leftOffset = (element.offsetLeft - 1) + 'px';
    this.width = (element.offsetWidth - 19) + 'px';
    this.indexChange.emit(index);
  }
}
