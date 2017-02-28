import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { LoadableComponent } from './common';
import { PageNotFoundComponent } from './page';
import { LayoutComponent, HeaderComponent } from './layout';

const bootstrap = [
  // angular
  CommonModule,
  FormsModule,
  RouterModule,
  HttpModule,
  // etc
  MomentModule,
];

const components = [
  // layout
  HeaderComponent,
  LoadableComponent,
  // common
  LayoutComponent,
  // page
  PageNotFoundComponent,
];

@NgModule({
  imports: [
    ...bootstrap,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
    ...bootstrap,
  ],
})
export class SharedModule {}
