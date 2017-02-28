import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'c-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // for ng2-bootstrap
  public constructor(public viewContainerRef: ViewContainerRef) {}
}
