import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import {MatDividerModule} from '@angular/material/divider';
import { HomeComponent } from './home/home.component';

const materials =
  [LayoutModule,MatDividerModule, MatRippleModule, MatMenuModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, MatProgressBarModule];

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TranslateModule,
    ...materials
  ]
})
export class MainModule { }
