import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/incidents',
    pathMatch: 'full'
  },
  {
    path: 'incidents',
    loadChildren: () =>
      import('./incidents/incidents.module').then(m => m.IncidentsModule)
  },
  {
    path: 'options',
    loadChildren: () =>
      import('./options/options.module').then(m => m.OptionsModule)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then(m => m.ContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveCitizenRoute { }
