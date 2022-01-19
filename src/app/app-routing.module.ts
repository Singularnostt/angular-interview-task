import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { DoorListComponent } from './door-list/door-list.component';
import { DoorDetailsComponent } from './door-details/door-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons',
  },
  {
    path: 'persons',
    children: [
      {
        path: '',
        component: PersonListComponent,
      },
      {
        path: ':personId',
        component: PersonDetailsComponent,
      },
      {
        path: 'new',
        component: PersonDetailsComponent,
      },
    ],
  },
  {
    path: 'doors',
    children: [
      {
        path: '',
        component: DoorListComponent,
      },
      {
        path: ':doorId',
        component: DoorDetailsComponent,
      },
      {
        path: 'new',
        component: DoorDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
