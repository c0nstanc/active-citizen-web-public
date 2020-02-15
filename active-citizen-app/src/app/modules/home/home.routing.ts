import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentResolver } from './incident-resolver.service';
import { HomeComponent } from './page/home.component';
import { IncidentDetailsComponent } from './page/incident-details/incident-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'incidents/:id',
    component: IncidentDetailsComponent,
    resolve: {
      incident: IncidentResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
