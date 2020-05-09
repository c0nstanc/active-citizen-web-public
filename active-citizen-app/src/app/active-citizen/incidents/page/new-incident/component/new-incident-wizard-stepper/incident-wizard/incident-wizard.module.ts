import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentWizardRoute } from './incident-wizard.routing';
import { EnterLocationComponent } from './page/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './page/enter-incident-detail/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './page/enter-incident-photo/enter-incident-photo.component';
import { SummaryIncidentComponent } from './page/summary-incident/summary-incident.component';

@NgModule({
  declarations: [EnterLocationComponent,
    EnterIncidentDetailsComponent,
    EnterIncidentPhotoComponent,
    SummaryIncidentComponent],
  imports: [
    SharedModule,
    IncidentWizardRoute
  ],
  exports: []
})
export class IncidentWizardModule { }
