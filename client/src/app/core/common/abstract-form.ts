import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AfterViewInit, OnDestroy } from '@angular/core';

import { FormManager, FormErrorList } from '../form';

export abstract class AbstractForm implements AfterViewInit, OnDestroy {
  // should be setted in child class
  protected form: FormGroup;

  protected formValueChangesListener: Subscription;

  public ngAfterViewInit() {
    this.addFormListeners();
  }

  public ngOnDestroy() {
    this.removeFormListeners();
  }

  protected applyFormErrorList(list: FormErrorList) {
    if (list) {
      FormManager.applyErrorList(this.form, list);
    } else {
      this.resetCustomFormErrors();
    }
  }

  protected addFormListeners() {
    this.formValueChangesListener = this.form.valueChanges.subscribe(this.onFormValueChanges.bind(this));
  }

  protected onFormValueChanges() {
    this.resetCustomFormErrors();
  }

  protected removeFormListeners() {
    this.formValueChangesListener.unsubscribe();
  }

  protected resetCustomFormErrors() {
    FormManager.resetCustomErrors(this.form);
  }
}
