import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export type AppStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  public stateChanges = new Subject();

  private _state: AppStateType = {};

  public get state(): AppStateType {
    return _.clone(this._state);
  }

  public get(prop?: any) {
    const state = this.state;

    return _.has(state, prop) ? _.get(state, prop) : state;
  }

  public set(prop: string, value: any) {
    _.set(this._state, prop, value);

    this.stateChanges.next(this.state);
  }

  public replaceState(state: AppStateType) {
    this._state = state;

    this.stateChanges.next(this.state);
  }
}
