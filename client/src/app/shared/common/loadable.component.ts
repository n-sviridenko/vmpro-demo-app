import {
  Input,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'c-loadable',
  templateUrl: './loadable.component.html',
})
export class LoadableComponent {
  @Input()
  public loading: boolean;

  @Input()
  public error: any;

  @Input()
  public allowReload: boolean = false;

  @Output()
  public reload = new EventEmitter<any>();

  public doReload() {
    this.reload.emit();
  }
}
