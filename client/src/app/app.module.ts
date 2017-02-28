import { AlertModule } from 'ng2-bootstrap/alert';
import { ModalModule } from 'ng2-bootstrap/modal';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

import { config } from 'config';
import { SharedModule } from './shared';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AppState, ApiService, VideoService, APP_CONFIG, AppStateType } from 'app/core';

const core = [
  AppState,
  ApiService,
  VideoService,
  { provide: APP_CONFIG, useValue: config },
];

type StoreType = {
  state: AppStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  imports: [
    // vendors
    BrowserModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    // app
    routing,
    SharedModule,
  ],
  providers: [
    ...core,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  public constructor(
    private appRef: ApplicationRef,
    private appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }

    console.log('HMR store', JSON.stringify(store, null, 2));

    this.appState.replaceState(store.state);

    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();

    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);

    store.state = this.appState.state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues  = createInputTransfer();

    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();

    delete store.disposeOldHosts;
  }
}
