import { fakeProduct, Product } from "./product";

export interface Category {

  id?: number;

  category__ar: string;
  category__fr: string;
  category__en: string;
  category?: string;

  created_at?: string;
  updated_at?: string;

  restaurants_id?: number;

  products?: Array<Product>;
}

export class fakeCategory implements Category {

  id = 1;
  category__ar = 'category';
  category__fr = 'category';
  category__en = 'category';
  category = 'category';

  restaurants_id = 1;

  products?: Product[];

  constructor() {
    this.products = new fakeProduct().get(8);
  }

  get(number: number) {
    const arr = [];
    for (let i = 0; i < number; i++) {

      arr.push({ ...this, id: i });

    }
    return arr;
  }

  empty() {

    this.id = null;
    this.category__ar = '';
    this.category__fr = '';
    this.category__en = '';
    this.category = '';

    this.restaurants_id = null;

    this.products = [];

    return this;
  }
}
