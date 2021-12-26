import { Order, orderFactory } from './dataModel/order';
import { Category } from './dataModel/category';
import { ResponseTrimmerService } from './custom-provider/response-trimmer.service';
import { User } from './dataModel/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ROOT = environment.API_URL;
const NOTIFICATION_LINK = `${ROOT}notifications`;
const USERS_ME = () => `${ROOT}users/me`;

const EXAMPLE = () => `${ROOT}restaurants`;
const EXAMPLE_PARAMS = (id_example) => `${ROOT}sizes/${id_example}`;


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private trimmer: ResponseTrimmerService) {
  }

  /* AUTHENTICATION */
  login = (email, password) => this.http.post(ROOT + 'login', { email, password });
  logout = () => this.http.get(ROOT + 'logout');
  notification = (data) => this.http.post(ROOT + 'notification', { fcm_id: data });
  register = (user) => this.http.post(ROOT + 'register', user);

  /* users/me */
  me_GET = () => this.http.get<any>(USERS_ME()).pipe(map(item => this.trimmer.user(item.user))).toPromise();

  getNotifications = () => this.http.get(NOTIFICATION_LINK).toPromise();

  /* example/ */
  Example_CREATE = (data) => this.http.post(EXAMPLE(), data).toPromise();
  Example_GET = () => this.http.get<{ vendors: Array<User>, delivery_workers: Array<User> }>(USER_WORKERS())
    .pipe(map(this.trimmer.mapper))
    .toPromise();
  OneExample_GET = (id_example) => this.http.get<User>(EXAMPLE_PARAMS(id_example)).pipe(map(this.trimmer.mapper)).toPromise();
  OneExample_DELETE = (id_example) => this.http.delete(EXAMPLE_PARAMS(id_example)).toPromise();
  OneExample_UPDATE = (id_example, data) => this.http.put(EXAMPLE_PARAMS(id_example), data).toPromise();


  download(url): Observable<any> {
    return this.http.get(ROOT + 'files/' + url, {
      headers: {
        accept: 'application/octet-stream',
        'content-type': 'application/octet-stream',
      },
      responseType: 'blob'
    });
  }

}

