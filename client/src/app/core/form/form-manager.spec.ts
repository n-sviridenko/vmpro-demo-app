import { FormGroup, FormControl } from '@angular/forms';

import { FormManager } from './form-manager';
import { FormErrorList } from './form-error-list';

describe('FormManager', () => {
  it('should apply error list', () => {
    const form = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
      profile: new FormGroup({
        firstName: new FormControl(),
      }),
    });

    const loginErrors = new FormErrorList();
    loginErrors.errors.push('Some error');

    const firstNameErrors = new FormErrorList();
    firstNameErrors.errors.push('Some error');

    const profileErrors = new FormErrorList();
    profileErrors.addChild('firstName', firstNameErrors);

    const errors = new FormErrorList();
    errors.addChild('login', loginErrors);
    errors.addChild('profile', profileErrors);

    FormManager.applyErrorList(form, errors);

    expect(form.get('login').dirty).toBe(true);
    expect(form.hasError('custom', ['login'])).toBe(true);

    expect(form.get('password').dirty).toBe(false);
    expect(form.hasError('custom', ['password'])).toBe(false);

    expect(form.get(['profile', 'firstName']).dirty).toBe(true);
    expect(form.hasError('custom', ['profile', 'firstName'])).toBe(true);
  });
});
