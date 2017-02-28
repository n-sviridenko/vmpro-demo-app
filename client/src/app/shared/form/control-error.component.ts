import * as _ from 'lodash';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

interface ControlError {
  name: string;
  parameters: any;
}

@Component({
  selector: 'c-control-error',
  templateUrl: './control-error.component.html',
})
export class ControlErrorComponent {
  @Input()
  public control: AbstractControl;

  public get errors(): ControlError[] {
    return ControlErrorComponent.getErrorsFromControl(this.control);
  }

  private static getErrorsFromControl(control: AbstractControl): ControlError[] {
    if (control.pristine || _.isEmpty(control.errors)) {
      return [];
    }

    return _.map(
      control.errors,
      (parameters: any, name: string) => ({ name, parameters })
    );
  }
}
