import { fakeSize, Size } from "./size";

export interface Ingredient {

  id?: number;

  ingredient__ar: string;
  ingredient__fr: string;
  ingredient__en: string;
  ingredient?: string;

  created_at?: string;
  updated_at?: string;

  products_id?: number;

}

export class fakeIngredient implements Ingredient {

  id = 1;
  ingredient__ar = 'paparoni';
  ingredient__fr = 'paparoni';
  ingredient__en = 'paparoni';
  ingredient = 'paparoni';

  products_id = 1;

  constructor() {

    // this.prices = new fakeSize().get(7).map((v, i) => { return { size: { ...v, size: `size ${i}` }, price: 20 * (i + 1) } })

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
    this.ingredient__ar = '';
    this.ingredient__fr = '';
    this.ingredient__en = '';
    this.ingredient = '';

    this.products_id = null;

    // this.prices = [];

    return this;
  }
}
