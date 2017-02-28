import { Routes, RouterModule }  from '@angular/router';

import { VideoListComponent } from './list';

const routes: Routes = [
  {
    path: '',
    component: VideoListComponent,
  },
];

export const routing = RouterModule.forChild(routes);
