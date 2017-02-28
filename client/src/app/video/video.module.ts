import { NgModule } from '@angular/core';

import { routing } from './video.routing';
import { SharedModule } from 'app/shared';
import {
  VideoListComponent,
  VideoListItemComponent,
  VideoListGeneratorComponent,
  VideoListGeneratorFormComponent,
} from './list';

@NgModule({
  imports: [
    routing,
    SharedModule,
  ],
  declarations: [
    VideoListComponent,
    VideoListItemComponent,
    VideoListGeneratorComponent,
    VideoListGeneratorFormComponent,
  ],
})
export class VideoModule {}
