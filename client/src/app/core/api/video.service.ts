import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '../core';
import { Video, Thumbnail } from 'app/model';
import { VideoGenerateThumbnailMessage } from './message';
import { VideoHydrator, ThumbnailHydrator } from './hydrator';

@Injectable()
export class VideoService {
  public constructor(private apiService: ApiService) {}

  public getVideos(): Observable<Video[]> {
    return this.apiService
      .get('videos')
      .map(data => data.map(item => VideoHydrator.hydrate(new Video(), item)))
    ;
  }

  public generateVideoThumbnail(message: VideoGenerateThumbnailMessage): Observable<Thumbnail> {
    return this.apiService
      .post(`videos/${message.videoId}/generate-thumbnail`, { video_generate_thumbnail: message.build() })
      .map(data => ThumbnailHydrator.hydrate(new Thumbnail(), data))
    ;
  }
}
