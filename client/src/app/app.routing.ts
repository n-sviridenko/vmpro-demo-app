import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from 'app/shared';

export const routes: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

export const routing = RouterModule.forRoot(routes);
