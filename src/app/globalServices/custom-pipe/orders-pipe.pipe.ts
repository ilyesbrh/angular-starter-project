import { Order } from './../dataModel/order';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersPipe',
  pure: false
})
export class OrdersPipePipe implements PipeTransform {

  transform(orders: Array<Order>, type: string): Array<Order> {

    return orders.filter((o) => {

      switch (type) {
        case 'new':
          return !o.consult_status && !o.confirmation_status && !o.cooked_status && !o.delivery_status && !o.received_status;
        case 'confirmed':
          return o.consult_status && o.confirmation_status && !o.cooked_status && !o.delivery_status && !o.received_status;
        case 'declined':
          return o.consult_status && !o.confirmation_status && !o.cooked_status && !o.delivery_status && !o.received_status;
        case 'delivering':
          return o.consult_status && o.confirmation_status && o.cooked_status && !o.delivery_status && !o.received_status && !o.delivery_man;
        default:
          return true;
      }

    });

  }

}
