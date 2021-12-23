import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthManagerService } from './globalServices/auth-service/auth-manager.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class AppComponent {
  title = 'EXP Finance';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, translate: TranslateService, private auth: AuthManagerService) {

    /* NGX translate */
    translate.use(this.auth.getLanguage() ? this.auth.getLanguage() : 'fr');

    iconRegistry.addSvgIcon('Point', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/point.svg'));
    iconRegistry.addSvgIcon('Bell', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Bell.svg'));
    iconRegistry.addSvgIcon('Gear', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Gear.svg'));
    iconRegistry.addSvgIcon('SquaresFour', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/SquaresFour.svg'));
    iconRegistry.addSvgIcon('Users', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Users.svg'));
    iconRegistry.addSvgIcon('Storefront', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Storefront.svg'));
    iconRegistry.addSvgIcon('Swatches', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Swatches.svg'));
    iconRegistry.addSvgIcon('Receipt', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Receipt.svg'));
    iconRegistry.addSvgIcon('PlusCircle', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/PlusCircle.svg'));
    iconRegistry.addSvgIcon('down', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/down.svg'));
    iconRegistry.addSvgIcon('MagnifyingGlass', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/MagnifyingGlass.svg'));
    iconRegistry.addSvgIcon('CaretDown', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/CaretDown.svg'));
    iconRegistry.addSvgIcon('ArrowLeft', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/ArrowLeft.svg'));
    iconRegistry.addSvgIcon('Camera', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Camera.svg'));

    iconRegistry.addSvgIcon('c-home', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/home.svg'));
    iconRegistry.addSvgIcon('c-school', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/school.svg'));
    iconRegistry.addSvgIcon('c-teacher', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/teacher.svg'));
    iconRegistry.addSvgIcon('c-groups', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/groups.svg'));
    iconRegistry.addSvgIcon('c-bookmark', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/bookmark.svg'));
  }
}

