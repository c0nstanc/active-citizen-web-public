import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';
import { Router } from '@angular/router';
import { Incident } from 'src/app/data/schema/incident.model';
import { SubSink } from 'subsink';
import { startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faImages } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-summary-incident',
  templateUrl: './summary-incident.component.html',
  styleUrls: ['./summary-incident.component.scss']
})
export class SummaryIncidentComponent implements OnInit, SubmittableWizardStep, OnDestroy {

  incident: Incident;

  images$: Observable<IconDefinition>;

  subs: SubSink = new SubSink();

  constructor(
    private formBuilder: FormBuilder,
    private clonerService: ClonerService,
    private newIncidentWizardService: NewIncidentWizardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.newIncidentWizardService.newIncidedUpdated.subscribe(
      (newIncident: Incident) => {
        this.incident = newIncident;
        if (this.incident.imageUrls.length === 0) {
          this.incident.imageUrls.push('data:image/png;base64,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');
        }
      }
    );
  }

  getFormGroup(): FormGroup {
    return this.clonerService.cloneFormGroup(this.buildForm()) as FormGroup;
  }

  onSubmit(): void {
    this.newIncidentWizardService.submitIncident();
    this.router.navigate(['incidents/my-incidents']);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({});
  }




  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
