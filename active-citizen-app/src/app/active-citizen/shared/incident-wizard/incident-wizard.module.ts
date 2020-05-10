import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentWizardRoute } from './incident-wizard.routing';
import { EnterLocationComponent } from './component/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './component/enter-incident-detail/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './component/enter-incident-photo/enter-incident-photo.component';
import { SummaryIncidentComponent } from './component/summary-incident/summary-incident.component';
import { NewIncidentWizardService } from './service/new-incident-wizard.service';
import { IncidentMapsModule } from '../incident-maps/incident-maps.module';

@NgModule({
  declarations: [EnterLocationComponent,
    EnterIncidentDetailsComponent,
    EnterIncidentPhotoComponent,
    SummaryIncidentComponent],
  imports: [
    SharedModule,
    IncidentWizardRoute,
    IncidentMapsModule
  ],
  exports: [],
  providers: [NewIncidentWizardService]
})
export class IncidentWizardModule { }
