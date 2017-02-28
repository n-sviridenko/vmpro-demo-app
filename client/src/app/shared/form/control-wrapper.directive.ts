import { AbstractControl } from '@angular/forms';
import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[dControlWrapper]',
})
export class ControlWrapperDirective {
  @Input('dControlWrapper')
  private control: AbstractControl; // tslint:disable-line:no-input-rename

  @HostBinding('class.has-danger')
  public get isInvalid() {
    return !this.control.pristine && !this.control.valid;
  }
}
