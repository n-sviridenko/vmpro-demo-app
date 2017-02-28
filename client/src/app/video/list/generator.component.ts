import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Input, Component } from '@angular/core';

import { Video, Thumbnail } from 'app/model';
import { VideoService, AbstractLoadable, VideoGenerateThumbnailMessage } from 'app/core';

@Component({
  selector: 'c-video-list-generator',
  templateUrl: './generator.component.html',
})
export class VideoListGeneratorComponent extends AbstractLoadable<Thumbnail> {
  public qualities: string[] = [
    '108p',
    '288p',
    '360p',
    '480p',
    '720p',
    '1080p',
  ];

  public extensions: string[] = [
    'mp4',
    'webm',
    'asf',
  ];

  private message: VideoGenerateThumbnailMessage = new VideoGenerateThumbnailMessage();

  public constructor(private videoService: VideoService) {
    super();
  }

  public get errorMessage(): string {
    return this.error && !_.isEmpty(this.error.message) ? `${this.error.message}` : null;
  }

  @Input()
  public set video(video: Video) {
    this.error = null;
    this.data = null;

    this.message.videoId = video.id;
    this.message.quality = this.qualities[0];
    this.message.extension = this.extensions[0];
    this.message.time = moment().startOf('day');
  }

  protected getDataSource(): Observable<Thumbnail> {
    return this.videoService.generateVideoThumbnail(this.message);
  }
}
