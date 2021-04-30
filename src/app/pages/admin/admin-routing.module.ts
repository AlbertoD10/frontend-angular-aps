import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ClientGuard } from 'src/app/client.guard';

import { ClientComponent } from 'src/app/components/client/client.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SearchBarComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [ClientGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
