import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterLocationComponent } from './component/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './component/enter-incident-detail/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './component/enter-incident-photo/enter-incident-photo.component';
import { TakePictureComponent } from 'src/app/shared/component/take-picture/take-picture.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'step0',
    pathMatch: 'full'
  },
  {
    path: 'step0',
    component: EnterLocationComponent,

  },
  {
    path: 'step1',
    component: EnterIncidentDetailsComponent
  },
  {
    path: 'step2',
    component: EnterIncidentPhotoComponent
  },
  // {
  //   path: 'step3',
  //   component: TakePictureComponent
  // }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentWizardRoutingModule { }
