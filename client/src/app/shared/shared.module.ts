import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { AlertModule } from 'ng2-bootstrap/alert';
import { ModalModule } from 'ng2-bootstrap/modal';

import { LoadableComponent } from './common';
import { PageNotFoundComponent } from './page';
import { LayoutComponent, HeaderComponent } from './layout';
import { ControlErrorComponent, ControlWrapperDirective, TimepickerComponent } from './form';

const bootstrap = [
  // angular
  CommonModule,
  FormsModule,
  RouterModule,
  HttpModule,
  // etc
  AlertModule,
  ModalModule,
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
  // form
  TimepickerComponent,
  ControlErrorComponent,
  ControlWrapperDirective,
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
