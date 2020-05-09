import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyIncidentsComponent } from './page/my-incidents/my-incidents.component';
import { NewIncidentComponent } from './page/new-incident/new-incident.component';
import { IncidentDetailsComponent } from './page/incident-details/incident-details.component';
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
      import('./page/new-incident/component/new-incident-wizard-stepper/incident-wizard/incident-wizard.module')
      .then(m => m.IncidentWizardModule)
  },
  {
    path: ':id',
    component: IncidentDetailsComponent,
    resolve: {
      incident: IncidentResolver
    }
  },
  // { path: '**', redirectTo: '', pathMatch: 'full' }
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
export class IncidentsRoute { }
