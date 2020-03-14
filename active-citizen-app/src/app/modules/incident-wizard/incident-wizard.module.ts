import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentWizardRoutingModule } from './incident-wizard.routing.module';
import { EnterLocationComponent } from './component/enter-location/enter-location.component';
import { EnterIncidentDetailsComponent } from './component/enter-incident-detail/enter-incident-details.component';
import { EnterIncidentPhotoComponent } from './component/enter-incident-photo/enter-incident-photo.component';
import { NewIncidentWizardStepperComponent } from './component/new-incident-wizard-stepper/new-incident-wizard-stepper.component';
import { SubmitIncidentComponent } from './component/submit-incident/submit-incident.component';

@NgModule({
  declarations: [EnterLocationComponent,
    EnterIncidentDetailsComponent,
    EnterIncidentPhotoComponent,
    NewIncidentWizardStepperComponent,
    SubmitIncidentComponent],
  imports: [
    SharedModule,
    IncidentWizardRoutingModule

  ],
  exports: [NewIncidentWizardStepperComponent]
})
export class IncidentWizardModule { }
