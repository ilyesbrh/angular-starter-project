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

  mapper = (val) => {

    val.forEach(e => {
      let keys = Object.keys(e);
      let vals = Object.values(e);

      for (let i = 0; i < keys.length; i++) {
        e[keys[i].split('__')[0]] = vals[i];
      }

    });
    return val;
  }

  user(data: User) {
    const lang = this.translate.currentLang;

    // @ts-ignore
    // data.status = data.status == '1' ? true : false;

    // data.address = data['address__' + lang];

    return data;
  }

}
