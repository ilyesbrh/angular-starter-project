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

  private _loading: Boolean;

  public get loading(): Boolean {
    return this._loading;
  }
  public set loading(value: Boolean) {
    this._loading = value;
  }


  constructor(public http: RestService, private translate: TranslateService) { }

  public isLoading() {
    return this._me_loading || this._loading;
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
