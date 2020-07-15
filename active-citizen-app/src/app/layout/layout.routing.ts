import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from '../core/guard/no-auth.guard';
import { ActiveCitizenLayoutPageComponent } from './component/active-citizens-layout-page/active-citizens-layout-page.component';
import { AuthLayoutPageComponent } from './component/auth-layout-page/auth-layout-page.component';
import { PlaygroundPageComponent } from '../playground/component/playground-page/playground-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutPageComponent,
    loadChildren: () =>
      import('../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'playground',
    component: PlaygroundPageComponent,
    loadChildren: () =>
      import('../playground/playground.module').then(m => m.PlaygroundModule)
  },
 {
    path: '',
    component: ActiveCitizenLayoutPageComponent,
    loadChildren: () =>
      import('../active-citizen/active-citizen.module').then(m => m.ActiveCitizenModule),
      canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoute { }
