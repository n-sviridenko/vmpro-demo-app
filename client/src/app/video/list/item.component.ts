import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from 'app/model';

const css = require('./item.component.scss');

@Component({
  selector: 'c-video-list-item',
  templateUrl: './item.component.html',
})
export class VideoListItemComponent {
  @Input()
  public video: Video;

  @Output()
  public generate: EventEmitter<any> = new EventEmitter();

  public css = css;

  public get imageStyle(): any {
    return {
      'background-image': `url(${this.video.thumbnail})`,
    };
  }

  public doGenerate() {
    this.generate.emit();
  }
}
