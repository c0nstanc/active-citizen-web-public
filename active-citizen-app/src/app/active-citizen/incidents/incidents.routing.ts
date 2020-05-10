import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyIncidentsComponent } from './component/my-incidents/my-incidents.component';
import { NewIncidentComponent } from './component/new-incident/new-incident.component';
import { IncidentDetailsComponent } from './component/incident-details/incident-details.component';
import { IncidentResolver } from './incident-resolver.service';

export const routes: Routes = [

  {
    path: '',
    component: MyIncidentsComponent
  },
  {
    path: 'new',
    component: NewIncidentComponent,
    loadChildren: () =>
      import('../shared/incident-wizard/incident-wizard.module')
        .then(m => m.IncidentWizardModule)
  },
  {
    path: ':id',
    component: IncidentDetailsComponent,
    resolve: {
      incident: IncidentResolver
    }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoute { }
