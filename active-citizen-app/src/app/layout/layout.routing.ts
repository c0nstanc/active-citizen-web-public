import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from '../core/guard/no-auth.guard';
import { ActiveCitizenLayoutPageComponent } from './active-citizens-layout-page/active-citizens-layout-page.component';
import { AuthLayoutPageComponent } from './auth-layout-page/auth-layout-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutPageComponent,
    loadChildren: () =>
      import('../auth/auth.module').then(m => m.AuthModule)
  },
 {
    path: '',
    component: ActiveCitizenLayoutPageComponent,
    loadChildren: () =>
      import('../active-citizen/active-citizen.module').then(m => m.ActiveCitizenModule),
      canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoute { }


// {
//   path: '',
//   component: ContentLayoutComponent,
//   children: [
//     {
//       path: 'incidents',
//       loadChildren: () =>
//         import('./active-citizen/incidents/incidents.module').then(m => m.IncidentsModule)
//     },
//     {
//       path: 'options',
//       loadChildren: () =>
//         import('./active-citizen/options/options.module').then(m => m.OptionsModule)
//     },
//     {
//       path: 'about',
//       loadChildren: () =>
//         import('./active-citizen/about/about.module').then(m => m.AboutModule)
//     },
//     {
//       path: 'contact',
//       loadChildren: () =>
//         import('./active-citizen/contact/contact.module').then(m => m.ContactModule)
//     }
//   ]
// },
// {
//   path: 'auth',
//   component: AuthLayoutComponent,
//   loadChildren: () =>
//     import('./active-citizen/auth/auth.module').then(m => m.AuthModule)
// },
// // Fallback when no prior routes is matched
// // { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
