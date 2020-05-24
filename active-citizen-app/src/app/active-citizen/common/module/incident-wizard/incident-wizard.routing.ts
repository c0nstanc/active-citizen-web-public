import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterLocationComponent } from './component/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './component/enter-incident-details/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './component/enter-incident-photo/enter-incident-photo.component';
import { SummaryIncidentComponent } from './component/summary-incident/summary-incident.component';


const routes: Routes = [
  {
    path: 'step1',
    component: EnterLocationComponent,

  },
  {
    path: 'step2',
    component: EnterIncidentDetailsComponent
  },
  {
    path: 'step3',
    component: EnterIncidentPhotoComponent
  },
  {
    path: 'step4',
    component: SummaryIncidentComponent
  },
  {
    path: '**',
    redirectTo: 'step1'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentWizardRoute { }
