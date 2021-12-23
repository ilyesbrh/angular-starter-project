import { fakeProduct } from './product';
import { Product } from 'src/app/globalServices/dataModel/product';
import { Size } from 'src/app/globalServices/dataModel/size';
import { Ingredient } from './ingredient';
import { fakeImage, Image } from "./image";
import { Category, fakeCategory } from "./category";
import { fakeOffer, Offer } from "./offer";
import { fakePlan, Plan } from "./plan";

export interface Restaurant {

  id?: number;

  name__ar: string;
  name__fr: string;
  name__en: string;
  name?: string;
  address__en: string;
  address__ar: string;
  address__fr: string;
  address?: string;
  description?: string;

  phone: string;
  email: string;

  latitude: number;
  longitude: number;

  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;

  status: boolean;

  rating?: number;
  price_delivery?: number;

  created_at?: string;
  updated_at?: string;

  users_id?: number;

  images?: Array<Image>;
  offers?: Array<Offer>;
  plans?: Array<Plan>;
  categories?: Array<Category>;
  equivalents?: Array<any>;
  ingredients?: Array<Ingredient>;
  products?: Array<Product>;
  win?: Array<any>;
}

export class fakeRestaurant implements Restaurant {

  id = 1;
  name__ar = 'restaurant';
  name__fr = 'restaurant';
  name__en = 'restaurant';
  name = 'restaurant';
  address__en = 'address';
  address__ar = 'address';
  address__fr = 'address';
  address = 'address';
  description = 'description';
  phone = '0555095956';
  email = 'brhilyes@gmail.com';
  latitude = 15.1354;
  longitude = 15.1354;
  facebook = 'facebook';
  twitter = 'twitter';
  instagram = 'instagram';
  youtube = 'youtube';
  status = true;
  rating = 4;
  price_delivery = 0;

  users_id = 1;

  images?: Image[];
  offers?: Offer[];
  plans?: Plan[];
  categories?: Category[];
  equivalents?: any[];
  ingredients?: Ingredient[];
  products?: Product[];
  win?: any[];
  constructor() {
    this.images = new fakeImage().get(5)
    this.offers = new fakeOffer().get(5)
    this.plans = new fakePlan().get(5)
    this.categories = new fakeCategory().get(5)
    this.products = new fakeProduct().get(5)
    this.equivalents = ['', '', '', '', '']
  }

  get(number: number): Restaurant[] {
    const arr = [];
    for (let i = 0; i < number; i++) {

      arr.push({ ...this, id: i });

    }
    return arr;
  }

  empty() {
    this.name__ar = '';
    this.name__fr = '';
    this.name__en = '';
    this.name = '';
    this.address__en = '';
    this.address__ar = '';
    this.address__fr = '';
    this.address = '';
    this.description = '';
    this.phone = '';
    this.email = '';
    this.latitude = null;
    this.longitude = null;
    this.facebook = '';
    this.twitter = '';
    this.instagram = '';
    this.youtube = '';
    this.status = false;
    this.rating = null;
    this.price_delivery = 0;

    this.users_id = null;

    this.images = [];
    this.offers = [];
    this.plans = [];
    this.categories = [];
    this.ingredients = [];
    this.products = [];
    this.equivalents = [];
    this.win = [];

    return this;
  }

}
export function RestaurantConstructor(restaurant: Restaurant, sizes: Size[]) {

  // @ts-ignore
  restaurant.images = restaurant.graphics_rests;
  // @ts-ignore
  delete restaurant.graphics_rests;
  // @ts-ignore
  restaurant.categories = restaurant.categories_products;
  // @ts-ignore
  delete restaurant.categories_products;

  restaurant.products.forEach((product: Product) => {

    product.ingredients_supplements = product.ingredients_supplements.map(
      i => {

        // @ts-ignore
        i.size = sizes.find(s => s.id === i.pivot.sizes_id)
        // @ts-ignore
        i.price = i.pivot.price;

        return i;
      }
    )

    // @ts-ignore
    product.prices = product.sizes.map((size: Size) => {

      return {
        size: sizes.find(s => size.id == s.id),
        // @ts-ignore
        price: size.pivot.price
      }
    })

  });

  restaurant.offers.forEach(
    o => {
      o.products = o.products.map(
        prod => {
          // @ts-ignore
          const quantity = prod.pivot.quantity
          // @ts-ignore
          const size = sizes.find(s => s.id == prod.pivot.sizes_id)
          const product = restaurant.products.find(p => p.id == prod.id);

          return { ...product, size, quantity }
        }
      )

      return o;

    }
  )

  return restaurant;

}
