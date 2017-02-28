import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from 'app/shared';

export function loadVideos() {
  return new Promise((resolve) => {
    (require as any).ensure([], (require) => {
      resolve(require('./video').VideoModule);
    });
  });
}

export const routes: Routes = [
  {
    path: 'videos',
    loadChildren: loadVideos,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

export const routing = RouterModule.forRoot(routes);
