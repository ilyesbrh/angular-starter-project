import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { RestService } from './REST.service';
import { Size } from './dataModel/size';
import { Restaurant } from './dataModel/restaurant';
import { User } from './dataModel/user';


@Injectable({
  providedIn: 'root'
})
export class StateManager {

  private _me: User;
  private _me_loading = false;
  private _me_loaded = new Subject();
  private _restaurants: Restaurant[];
  private _restaurants_loading = false;
  private _restaurants_loaded = new Subject();
  private _delivery_workers: User[];
  private _delivery_workers_loading = false;
  private _delivery_workers_loaded = new Subject();
  private _sizes: Size[];
  private _sizes_loading = false;
  private _sizes_loaded = new Subject();
  private _selected_restaurant: Restaurant;

  private _loading: Boolean;

  public get loading(): Boolean {
    return this._loading;
  }
  public set loading(value: Boolean) {
    this._loading = value;
  }


  constructor(public http: RestService, private translate: TranslateService) { }

  public isLoading() {
    return this._me_loading || this._sizes_loading || this._restaurants_loading || this._delivery_workers_loading || this._loading;
  }

  public swalConfig() {

    return {
      title: this.translate.instant('delete_field'),
      icon: 'warning',
      text: this.translate.instant('delete_text'),
      confirmButtonText: this.translate.instant('delete'),
      confirmButtonColor: '#F95D53',
      cancelButtonColor: 'transparent',
      cancelButtonText: this.translate.instant('cancel'),
      showCancelButton: true
    };
  }


  public async get_factory<r>(target: string, getter: Function, ...params: any): Promise<r> {

    if (!this['_' + target]) {

      if (!this['_' + target + '_loading']) {

        this['_' + target + '_loading'] = true;
        this['_' + target] = await getter(...params);

        this['_' + target + '_loading'] = false;
        this['_' + target + '_loaded'].next(true);

      } else {
        await this['_' + target + '_loaded'].toPromise();
      }
    }

    return of(this['_' + target]).toPromise();

  }

  public get_me = async (): Promise<User> => this.get_factory<User>('me', this.http.me_GET);
  public get_restaurants = async (): Promise<Restaurant[]> => this.get_factory<Restaurant[]>('restaurants', this.http.restaurants_GET, (await this.get_sizes()));
  public get_sizes = (): Promise<Size[]> => this.get_factory<Size[]>('sizes', this.http.Sizes_GET);
  public update_sizes = async () => {
    this._sizes = await this.http.Sizes_GET();
  };


  public get_delivery_workers = async (force = true): Promise<User[]> => {

    const selected_restaurant = await this.get_selectedRestaurant()

    if (force) return await this.http.WorkersDeliveryman_GET(selected_restaurant.id);

    return this.get_factory<User[]>('delivery_workers', this.http.WorkersDeliveryman_GET, selected_restaurant.id)
  };

  public async set_selectedRestaurant(restaurant_id: any) {

    if (this._selected_restaurant && restaurant_id == this._selected_restaurant.id) return this._selected_restaurant;

    const sizes = await this.get_sizes();
    this._selected_restaurant = await this.http.Restaurant_GET(restaurant_id, sizes);

    this._delivery_workers = null;
    await this.get_delivery_workers();

    localStorage.setItem('selected_restaurant', restaurant_id);

    return this._selected_restaurant;
  }

  public async get_selectedRestaurant(): Promise<Restaurant> {

    if (this._selected_restaurant) return this._selected_restaurant;

    try {
      /* try to get id from local storage */
      let id = Number.parseInt(localStorage.getItem('selected_restaurant'));
      const sizes = await this.get_sizes();
      this._selected_restaurant = await this.http.Restaurant_GET(id, sizes);
      return this._selected_restaurant;
    } catch (error) {
      /* if there is no cached id get the first item in restaurants if exists else return null*/
      const restaurants = await this.get_restaurants();
      return restaurants.length > 0 ? restaurants[0] : null;
    }

  }


  public toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  public serialize(obj) {

    const fd = new FormData();

    const keys = Object.keys(obj);
    const vals = Object.values(obj) as any;

    for (let i = 0; i < keys.length; i++) {

      fd.append(keys[i], vals[i]);
    }

    return fd;
  }


}
