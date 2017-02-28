import * as moment from 'moment';

import { MessageInterface } from './message.interface';

export class VideoGenerateThumbnailMessage implements MessageInterface {
  public videoId: string = '';

  public time?: moment.Moment;

  public quality: string = '';

  public extension: string = '';

  public build(): any {
    return {
      time: this.time ? this.time.format('HH:mm:ss') : null,
      quality: this.quality,
      extension: this.extension,
    };
  }
}
