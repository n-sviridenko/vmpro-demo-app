import * as _ from 'lodash';
import * as moment from 'moment';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  Input,
  Component,
  forwardRef,
} from '@angular/core';

const controlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimepickerComponent),
  multi: true,
};

@Component({
  selector: 'c-timepicker',
  templateUrl: './timepicker.component.html',
  providers: [controlValueAccessor],
})
export class TimepickerComponent implements ControlValueAccessor {
  @Input()
  public inputId: string;

  public hours: number[];

  public minutes: number[];

  public seconds: number[];

  private _hour: number = 0;

  private _minute: number = 0;

  private _second: number = 0;

  public constructor() {
    this.hours = _.range(24);
    this.minutes = _.range(60);
    this.seconds = _.range(60);
  }

  public get value(): moment.Moment {
    return moment()
      .hour(this._hour)
      .minute(this._minute)
      .second(this._second)
    ;
  };

  public set value(value: moment.Moment) {
    if (value) {
      this._hour = value.hour();
      this._minute = value.minute();
      this._second = value.second();
    } else {
      this._hour = 0;
      this._minute = 0;
      this._second = 0;
    }
  }

  public get hour(): string {
    return `${this._hour}`;
  }

  public set hour(rawHour: string) {
    const hour = parseInt(rawHour, 10);

    if (this._hour === hour) {
      return;
    }

    this._hour = hour;

    this.emitChanges();
  }

  public get minute(): string {
    return `${this._minute}`;
  }

  public set minute(rawMinute: string) {
    const minute = parseInt(rawMinute, 10);

    if (this._minute === minute) {
      return;
    }

    this._minute = minute;

    this.emitChanges();
  }

  public get second(): string {
    return `${this._second}`;
  }

  public set second(rawSecond: string) {
    const second = parseInt(rawSecond, 10);

    if (this._second === second) {
      return;
    }

    this._second = second;

    this.emitChanges();
  }

  public writeValue(value: moment.Moment) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private emitChanges() {
    this.onChangeCallback(this.value);
  }

  private onTouchedCallback: () => void = () => undefined;

  private onChangeCallback: (_: any) => void = () => undefined;
}
