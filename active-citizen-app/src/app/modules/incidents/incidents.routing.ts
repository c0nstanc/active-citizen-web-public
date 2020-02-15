import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentResolver } from './incident-resolver.service';
import { MyIncidentsComponent } from './pages/my-incidents/my-incidents.component';
import { NewIncidentComponent } from './pages/new-incident/new-incident.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-incidents',
    pathMatch: 'full'
  },
  {
    path: 'my-incidents',
    component: MyIncidentsComponent
  },
  {
    path: 'new-incident',
    component: NewIncidentComponent
  },
    // {
  //   path: 'incidents/:id',
  //   component: IncidentDetailsComponent,
  //   resolve: {
  //     incident: IncidentResolver
  //   }
  // }
  // {
  //   path: 'incidents/:id',
  //   component: IncidentDetailsComponent,
  //   resolve: {
  //     incident: IncidentResolver
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule {}
