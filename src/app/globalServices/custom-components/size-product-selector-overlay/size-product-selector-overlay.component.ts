import { StateManager } from '../../state-manager.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../dataModel/product';
import { Size } from '../../dataModel/size';
import { RestService } from '../../REST.service';

@Component({
  templateUrl: './size-product-selector-overlay.component.html',
  styleUrls: ['./size-product-selector-overlay.component.scss']
})
export class SizeProductSelectorOverlayComponent implements OnInit {

  sizes: Size[];
  products: Product[];

  model = { size_id: null, product_id: null, quantity: 0 };

  constructor(public dialogRef: MatDialogRef<SizeProductSelectorOverlayComponent>, public state: StateManager,
    @Inject(MAT_DIALOG_DATA) public data: { restaurant_id: number, size: Size, product: Product, price: number }, private http: RestService) { }

  async ngOnInit() {

    this.model = { size_id: this.data.size.id, product_id: this.data.product.id, quantity: this.data.price };

    this.sizes = await this.state.get_sizes();
    this.products = await this.http.RestaurantProducts_GET(this.data.restaurant_id);
  }

  delete() {
    this.dialogRef.close({ delete: true });
  }
  save() {

    this.dialogRef.close(this.model);
  }
  cancel() {
    this.dialogRef.close()
  }
}
