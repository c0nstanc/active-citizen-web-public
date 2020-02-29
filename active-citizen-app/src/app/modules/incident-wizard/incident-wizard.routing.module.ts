import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterLocationComponent } from './component/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './component/enter-incident-detail/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './component/enter-incident-photo/enter-incident-photo.component';


const routes: Routes = [
  {
    path: '',
    component: EnterLocationComponent,

  },
  {
    path: '1',
    component: EnterIncidentDetailsComponent
  },
  {
    path: '2',
    component: EnterIncidentPhotoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentWizardRoutingModule { }
