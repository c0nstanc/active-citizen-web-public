import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyIncidentsComponent } from './pages/my-incidents/my-incidents.component';
import { NewIncidentComponent } from './pages/new-incident/new-incident.component';
import { IncidentDetailsComponent } from './pages/components/incident-details/incident-details.component';
import { IncidentResolver } from './incident-resolver.service';

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
    component: NewIncidentComponent,
    loadChildren: () =>
      import('../../modules/incident-wizard/incident-wizard.module').then(m => m.IncidentWizardModule)
  },
  {
    path: ':id',
    component: IncidentDetailsComponent,
    resolve: {
      incident: IncidentResolver
    }
  }
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
export class IncidentsRoutingModule { }
