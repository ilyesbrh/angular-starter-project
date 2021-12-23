import { fakeImage, Image } from "./image";
import { fakeProduct, Product } from "./product";

export interface Offer {

  id?: number;

  name__ar: string;
  name__fr: string;
  name__en: string;
  name?: string;
  type__fr: string,
  type__ar: string,
  type__en: string,
  type?: string,
  description__ar: string;
  description__fr: string;
  description__en: string;
  description?: string;

  price: number;

  restaurants_id?: number;

  created_at?: string;
  updated_at?: string;

  images?: Array<Image>;
  products?: Product[];
}

export class fakeOffer implements Offer {

  id = 1;
  name__ar = 'offer';
  name__en = 'offer';
  name__fr = 'offer';
  name = 'offer';

  type__fr = 'type';
  type__en = 'type';
  type__ar = 'type';
  type = 'type';

  description__ar = 'description';
  description__en = 'description';
  description__fr = 'description';
  description = 'description';

  price = 500;

  restaurants_id = 1;

  images?: Image[];
  products?: Product[];

  constructor() {
    this.images = new fakeImage().get(8);
    this.products = new fakeProduct().get(10);
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
    this.name__en = '';
    this.name__fr = '';
    this.name = '';

    this.type__fr = '';
    this.type__en = '';
    this.type__ar = '';
    this.type = '';

    this.description__ar = '';
    this.description__en = '';
    this.description__fr = '';
    this.description = '';

    this.price = null;

    this.restaurants_id = null;

    this.images = [];
    this.products = [];

    return this;
  }
}
