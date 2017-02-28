import * as _ from 'lodash';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FormErrorList, FormErrorListChildren } from './form-error-list';

export class FormManager {
  public static applyErrorList(form: FormGroup, list: FormErrorList) {
    FormManager.applyChildErrors(form, list.children);
  }

  public static resetCustomErrors(form: FormGroup) {
    _.forEach<AbstractControl>(form.controls, (control) => {
      if (control.hasError('custom')) {
        const restErrors = _.omit(control.errors, 'custom');

        control.setErrors(restErrors);
      }
    });
  }

  private static applyChildErrors(group: FormGroup, errors: FormErrorListChildren) {
    _.each(errors, (error: any, name: string) => {
      const control = group.get(name);

      if (control) {
        FormManager.applyChildError(control, error);
      }
    });
  }

  private static applyChildError(control: AbstractControl, error: FormErrorList) {
    control.markAsDirty();

    if (error.errors.length) {
      const controlErrors = {
        custom: error.errors.join('\n'),
      };

      control.setErrors(controlErrors);
    } else {
      control.setErrors(null);

      if (control instanceof FormGroup) {
        if (error.children) {
          FormManager.applyChildErrors(control, error.children);
        }
      }
    }
  }
}
