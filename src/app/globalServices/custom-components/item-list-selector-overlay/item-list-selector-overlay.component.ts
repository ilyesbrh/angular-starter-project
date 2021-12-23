import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../dataModel/product';
import { Size, fakeSize } from '../../dataModel/size';
import { RestService } from '../../REST.service';

@Component({
  templateUrl: './item-list-selector-overlay.component.html',
  styleUrls: ['./item-list-selector-overlay.component.scss']
})
export class ItemListSelectorOverlayComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ItemListSelectorOverlayComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      items: Array<any>,
      fields: any
    }
  ) { }
  ngOnInit(): void {
  }

}
