import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { OnInit, Component } from '@angular/core';

import { Video } from 'app/model';
import { VideoService, AbstractLoadable } from 'app/core';

@Component({
  selector: 'c-video-list',
  templateUrl: './list.component.html',
})
export class VideoListComponent extends AbstractLoadable<Video[]> implements OnInit {
  public columnCount: number = 4;

  public selectedVideo: Video;

  public constructor(private videoService: VideoService) {
    super();
  }

  public get videoGroups(): Video[][] {
    if (!this.data) {
      return [];
    }

    return _.chunk(this.data, this.columnCount);
  }

  public ngOnInit() {
    this.load();
  }

  public selectVideo(video: Video) {
    this.selectedVideo = video;
  }

  protected getDataSource(): Observable<Video[]> {
    return this.videoService.getVideos();
  }
}
