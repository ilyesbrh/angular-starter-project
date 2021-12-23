import { Product } from './../dataModel/product';
import { Category } from './../dataModel/category';
import { Restaurant } from './../dataModel/restaurant';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Offer } from '../dataModel/offer';
import { Plan } from '../dataModel/plan';
import { Ingredient } from '../dataModel/ingredient';
import { Size } from '../dataModel/size';
import { User } from '../dataModel/user';
import { Order } from '../dataModel/order';

@Injectable({
  providedIn: 'root'
})
export class ResponseTrimmerService {

  // this provider is created to created a translated attribute
  // in needed object  by abstraction layer between responses
  // from the server and consumer controllers
  // eg:
  // from
  //    day__fr: 'dimanche';
  //    day__ar: 'الاحد';
  //    day__en: 'sunday';
  // when language is arab to
  //    day__fr: 'dimanche';
  //    day__ar: 'الاحد';
  //    day__en: 'sunday';
  //    day: 'الاحد';
  // NOTE: subclasses get translated also

  constructor(private translate: TranslateService) { }



  user(data: User) {
    const lang = this.translate.currentLang;

    /*     // @ts-ignore
    data.restaurants_id = data.id_restaurant;
    */

    // @ts-ignore
    data.status = data.status == '1' ? true : false;

    data.address = data['address__' + lang];

    return data;
  }

  restaurant(data: Restaurant) {
    const lang = this.translate.currentLang;

    data.name = data['name__' + lang];
    data.description = data['description__' + lang];
    data.address = data['address__' + lang];

    if (data.categories)
      data.categories = data.categories.map(v => this.category(v));
    if (data.offers)
      data.offers = data.offers.map(v => this.offer(v));
    if (data.plans)
      data.plans = data.plans.map(v => this.plan(v));
    if (data.ingredients)
      data.ingredients = data.ingredients.map(v => this.ingredient(v));
    if (data.products)
      data.products = data.products.map(v => this.product(v));

    return data;
  }

  order(order: Order): Order {

    const lang = this.translate.currentLang;


    order.description = order['description__' + lang];

    order.confirmation_status = order.confirmation_status as any == 1 ? true : false;
    order.consult_status = order.consult_status as any == 1 ? true : false;
    order.cooked_status = order.cooked_status as any == 1 ? true : false;
    order.delivery_status = order.delivery_status as any == 1 ? true : false;
    order.received_status = order.received_status as any == 1 ? true : false;

    if (order.products)
      order.products.forEach(v => {
        v.product = this.product(v.product);
        v.size = this.size(v.size);
        if (v.ingredients)
          v.ingredients.forEach(i => {
            i.ingredient = this.ingredient(i.ingredient);
          })
      });

    if (order.offers)
      order.offers.forEach(v => {
        v.offer = this.offer(v.offer);
      });

    return order;

  }

  plan(data: Plan): Plan {
    const lang = this.translate.currentLang;

    data.day = data['day__' + lang];

    return data;
  }

  category(data: Category): Category {
    const lang = this.translate.currentLang;

    data.category = data['category__' + lang];

    if (data.products)
      data.products = data.products.map(v => this.product(v));

    return data;
  }

  product(data: Product): Product {
    const lang = this.translate.currentLang;

    data.name = data['name__' + lang];
    data.description = data['description__' + lang];

    if (data.ingredients)
      data.ingredients = data.ingredients.map(v => this.ingredient(v));
    if (data.ingredients_supplements)
      data.ingredients_supplements = data.ingredients_supplements.map(v => this.ingredient(v));

    return data;
  }

  ingredient(data: Ingredient): Ingredient {
    const lang = this.translate.currentLang;

    data.ingredient = data['ingredient__' + lang];

    return data;
  }

  size(data: Size): Size {
    const lang = this.translate.currentLang;

    data.size = data['size__' + lang];

    return data;
  }


  offer(data: Offer): Offer {
    const lang = this.translate.currentLang;

    data.name = data['name__' + lang];
    data.description = data['description__' + lang];
    data.type = data['type__' + lang];

    if (data.products)
      data.products = data.products.map(v => this.product(v));

    return data;

  }

}
