import { Size } from './../dataModel/size';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricesPipe',
  pure: false
})
export class PricesPipePipe implements PipeTransform {

  transform(value: Array<Size>): unknown {

    return !value
      ? []
      : value.map(v => {
        // @ts-ignore
        v.price = v.pivot.price;
        return v;
      });
  }

}
