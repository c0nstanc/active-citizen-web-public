import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterLocationComponent } from './page/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './page/enter-incident-detail/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './page/enter-incident-photo/enter-incident-photo.component';
import { SummaryIncidentComponent } from './page/summary-incident/summary-incident.component';


const routes: Routes = [
  {
    path: 'new',
    redirectTo: 'new/step1',
    pathMatch: 'full'
  },
  {
    path: 'step1',
    redirectTo: 'new/step1',
    pathMatch: 'full'
  },
  {
    path: 'step2',
    redirectTo: 'new/step2',
    pathMatch: 'full'
  },
  {
    path: 'step3',
    redirectTo: 'new/step3',
    pathMatch: 'full'
  },
  {
    path: 'step4',
    redirectTo: 'new/step4',
    pathMatch: 'full'
  },
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
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentWizardRoute { }
