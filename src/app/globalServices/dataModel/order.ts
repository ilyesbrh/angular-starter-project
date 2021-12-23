import { Restaurant } from './restaurant';
import { fakeSize } from './size';
import { fakeOffer, Offer } from './offer';
import { User, fakeUser } from './user';
import { Ingredient, fakeIngredient } from './ingredient';
import { Size } from 'src/app/globalServices/dataModel/size';
import { fakeProduct, Product } from './product';

export interface Order {

  id?: number;

  /* location */
  latitude_delivery?: number;
  longitude_delivery?: number;
  address_delivery?: string;


  description__en?: string;
  description__ar?: string;
  description__fr?: string;
  description?: string;

  price?: number;

  /* Status */
  confirmation_status?: boolean;
  cooked_status?: boolean;
  consult_status?: boolean;
  delivery_status?: boolean;
  received_status?: boolean;

  order_date_time?: number;
  date_time_received?: number;

  customer?: User;
  delivery_man?: User;

  products?: {
    product: Product,
    size: Size,
    quantity: number,
    ingredients?: {
      ingredient: Ingredient,
      quantity: number,
    }[]
  }[];

  offers?: { offer: Offer, quantity: number }[];

  restaurants_id?: number;
}

export interface order_modify {
  id?: number;

  /* location */
  latitude_delivery?: number;
  longitude_delivery?: number;
  address_delivery?: string;


  description__en?: string;
  description__ar?: string;
  description__fr?: string;
  description?: string;

  price?: number;

  /* Status */
  confirmation_status?: boolean;
  cooked_status?: boolean;
  consult_status?: boolean;
  delivery_status?: boolean;
  received_status?: boolean;

  order_date_time?: number;
  date_time_received?: number;

  customer?: number;
  delivery_man?: number;

  products?: [
    {
      product: number,
      size: number,
      quantity: number,
      ingredients: [
        {
          ingredient: number,
          quantity: number,
        }
      ]
    }
  ];
  offers?: [
    { offer: number, quantity: number }
  ];

  restaurants_id?: number;
}

export class fakeOrder implements Order {

  id = 1;
  latitude_delivery = 1234;
  longitude_delivery = 1234;
  address_delivery = "bba alger bordj annaser, rue 34 ,34000";
  description__en = null;
  description__ar = null;
  description__fr = null;
  description = null;
  price = 1000;
  confirmation_status = false;
  cooked_status = false;
  consult_status = false;
  delivery_status = false;
  received_status = false;
  order_date_time = 12354654;
  date_time_received = 156505463;
  customer = new fakeUser();
  delivery_man = null;

  products?: { product: Product; size: Size; quantity: number; ingredients: { ingredient: Ingredient; quantity: number; }[]; }[];
  offers?: { offer: Offer; quantity: number; }[];

  restaurants_id = 1;

  constructor() {
    this.products = new fakeProduct().get(6).map(v => {
      return {
        product: v,
        size: new fakeSize(),
        quantity: 4,
        ingredients: new fakeIngredient().get(3).map(v => { return { ingredient: v, quantity: 10 } })
      }
    });
    this.offers = new fakeOffer().get(3).map(v => { return { offer: v, quantity: 4 } });
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
    this.latitude_delivery = null;
    this.longitude_delivery = null;
    this.address_delivery = '';
    this.description__en = null;
    this.description__ar = null;
    this.description__fr = null;
    this.description = null;
    this.price = null;
    this.confirmation_status = false;
    this.cooked_status = false;
    this.consult_status = false;
    this.delivery_status = false;
    this.received_status = false;
    this.order_date_time = null;
    this.date_time_received = null;
    this.customer = null;
    this.delivery_man = null;

    this.products = []
    this.offers = []

    return this;
  }

}

export function orderFactory(order: Order, restaurant: Restaurant, sizes: Size[]) {

  // @ts-ignore
  order.address_delivery = order.address_destination;

  order.products = [];

  // @ts-ignore
  order.customer = order.users_customer ? order.users_customer[0] : null;

  order.offers.forEach(
    offer => {
      // @ts-ignore
      offer.offer = restaurant.offers.find(o => o.id == offer.offers_id)
    }
  )

  // @ts-ignore
  order.products_simple.forEach(
    (p: Product) => {

      // @ts-ignore
      const product = restaurant.products.find(pr => pr.id == p.products_id)

      // @ts-ignore
      const quantity = p.quantity as number;
      // @ts-ignore
      const size = sizes.find(s => s.id == p.sizes_id);

      order.products.push({ product, quantity, size });
    }
  )

  // @ts-ignore
  order.products_supp.forEach(
    (p: Product) => {

      // @ts-ignore
      const product = restaurant.products.find(pr => pr.id == p.products_id)

      if (!product) { return; }
      // @ts-ignore
      const quantity = p.pivot.quantity as number;
      // @ts-ignore
      const size = sizes.find(s => s.id == p.pivot.sizes_id);

      order.products.push({
        product, quantity, size,
        ingredients: p.ingredients.map(
          i => {
            return {
              // @ts-ignore
              ingredient: restaurant.ingredients.find(ing => ing.id == i.ingredients_id),
              // @ts-ignore
              quantity: i.quantity,
              // @ts-ignore
              price: i.price
            }
          }
        )
      });
    }
  )


  return order;

}
