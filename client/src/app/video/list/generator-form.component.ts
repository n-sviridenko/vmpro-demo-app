import { NgForm } from '@angular/forms';
import {
  Input,
  Output,
  Component,
  ViewChild,
  EventEmitter,
} from '@angular/core';

import {
  AbstractForm,
  FormErrorList,
  VideoGenerateThumbnailMessage,
} from 'app/core';

@Component({
  selector: 'c-video-list-generator-form',
  templateUrl: './generator-form.component.html',
})
export class VideoListGeneratorFormComponent extends AbstractForm {
  @Input()
  public model: VideoGenerateThumbnailMessage;

  @Input()
  public qualities: string[];

  @Input()
  public extensions: string[];

  @Input()
  public disabled: boolean;

  @Output()
  public formSubmit = new EventEmitter<any>();

  @Input()
  public set errors(errors: FormErrorList) {
    this.applyFormErrorList(errors);
  }

  @ViewChild('form')
  public set ngForm(ngForm: NgForm) {
    this.form = ngForm.form;
  }

  public doFormSubmit() {
    this.formSubmit.emit();
  }
}
