import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentWizardRoutingModule } from './incident-wizard.routing.module';
import { EnterLocationComponent } from './component/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './component/enter-incident-detail/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './component/enter-incident-photo/enter-incident-photo.component';

@NgModule({
  declarations: [EnterLocationComponent,
    EnterIncidentDetailsComponent,
    EnterIncidentPhotoComponent],
  imports: [
    IncidentWizardRoutingModule,

    SharedModule
  ],
  exports: [EnterLocationComponent,
    EnterIncidentDetailsComponent,
    EnterIncidentPhotoComponent]
})
export class IncidentWizardModule { }
