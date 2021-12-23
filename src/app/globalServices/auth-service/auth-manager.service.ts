import { StateManager } from './../state-manager.service';
import { User } from './../dataModel/user';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { tap, mapTo, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { RestService } from '../REST.service';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly LANGUAGE = 'user language';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly FCM_ID = 'FCM token';
  private readonly USER_TYPE = 'user type';
  private readonly USER = 'user object';
  RETRY_SECONDS: 10;

  constructor(private http: RestService, private state: StateManager, private router: Router) { }

  register(data): Observable<any> {
    return this.http.register(data).pipe(
      tap(result => this.doLoginUser(result)),
      mapTo({ success: true, message: 'Welcome again' }),
      catchError(error => {

        return of({ success: false, message: 'Your mail or password incorrect' });
      }));
  }
  login(data): Observable<any> {
    return this.http.login(data.email, data.password).pipe(
      tap(result => this.doLoginUser(result)),
      mapTo({ success: true, message: 'Welcome again' }),
      catchError(error => {

        return of({ success: false, message: 'Your mail or password incorrect' });
      }));
  }

  async logout(): Promise<boolean> {
    await this.http.logout();
    this.doLogoutUser();
    this.router.navigate(['/login']);
    return true;
  }

  setFCM_ID(token) {
    localStorage.setItem(this.FCM_ID, token);
    return this.http.notification(token);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  async getUser(): Promise<User> {

    return localStorage.getItem(this.USER) ? JSON.parse(localStorage.getItem(this.USER)) : await this.state.get_me();
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.USER_TYPE) === 'Admin';
  }

  public setLanguage(lang) {
    localStorage.setItem(this.LANGUAGE, lang);
  }
  public getLanguage() {
    return localStorage.getItem(this.LANGUAGE);
  }

  private doLoginUser(result: any): void {
    this.storeTokens(result.token, result.role, result.user);
  }

  private doLogoutUser(): void {
    localStorage.clear()
  }

  private storeTokens(jwt: string, userType: string, user: any): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    localStorage.setItem(this.USER_TYPE, userType);
    localStorage.setItem(this.USER, JSON.stringify(user));
  }
}
