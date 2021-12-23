import { Directionality } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthManagerService } from '../globalServices/auth-service/auth-manager.service';
import { User } from '../globalServices/dataModel/user';
import { MessagingService } from '../globalServices/messaging.service';
import { StateManager } from '../globalServices/state-manager.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 959.99px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  // notifications_list: Array<any> = [{ text: 'testing notification' }, { text: 'very very very very long notification' }];

  user: User;

  constructor(private messaging: MessagingService, private breakpointObserver: BreakpointObserver,
    private dir: Directionality, private cdr: ChangeDetectorRef, public auth: AuthManagerService,
    public translate: TranslateService, public state: StateManager) { }


  async ngOnInit() {
    // this.notifications_list = await this.http.getNotifications();
    this.user = await this.auth.getUser();

    try {
      const fcm_id = await this.messaging.requestPermission();

      const response = await this.auth.setFCM_ID(fcm_id).toPromise();
    } catch (error) {

    }

  }

  ngAfterContentChecked() {
    // this.cdr.detectChanges();
    // call or add here your code
  }

  setLanguage(item) {
    this.auth.setLanguage(item);
    location.reload();
  }

  logout() {
    this.auth.logout();
  }

}
