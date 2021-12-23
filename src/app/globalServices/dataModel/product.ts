import { Size, fakeSize } from './size';
import { fakeImage, Image } from "./image";
import { fakeIngredient, Ingredient } from "./ingredient";

export interface Product {
  id?: number;

  name__ar: string;
  name__fr: string;
  name__en: string;
  name?: string;
  description__ar: string;
  description__fr: string;
  description__en: string;
  description?: string;

  has_supplement: boolean;

  rating?: number;
  created_at?: string;
  updated_at?: string;

  categories_id?: number;
  restaurants_id?: number;

  images?: Array<Image>;
  ingredients?: Array<Ingredient>;
  ingredients_supplements?: Array<Ingredient>;
  prices?: Array<{ size: Size, price: number }>;
}

export class fakeProduct implements Product {

  id = 1;
  name__ar = 'منتوج';
  name__fr = 'produit';
  name__en = 'product';
  name = 'product';

  description__ar = 'description';
  description__fr = 'description';
  description__en = 'description';
  description = 'description';

  has_supplement = true;
  rating = 3;

  categories_id = 1;
  restaurants_id = 1;

  images?: Image[];
  ingredients?: Ingredient[];
  ingredients_supplements?: Ingredient[];
  prices?: { size: Size; price: number; }[];


  constructor() {
    this.images = new fakeImage().get(7);
    this.ingredients = new fakeIngredient().get(6);
    this.prices = new fakeSize().get(6).map((v, i) => { return { size: { ...v, size: `size ${i}` }, price: 100 * (i + 1) } })

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
    this.name__ar = '';
    this.name__fr = '';
    this.name__en = '';
    this.name = '';

    this.description__ar = '';
    this.description__fr = '';
    this.description__en = '';
    this.description = '';

    this.has_supplement = false;
    this.rating = null;

    this.categories_id = null;
    this.restaurants_id = null;

    this.images = [];
    this.ingredients = [];
    this.ingredients_supplements = [];
    this.prices = [];

    return this;
  }


}

