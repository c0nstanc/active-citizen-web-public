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
    this.initializeIcons();
    this.subs.sink = this.newIncidentWizardService.newIncidedUpdated.subscribe(
      (newIncident: Incident) => {
        this.incident = newIncident;
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


  private initializeIcons(): void {
    this.images$ = this.loadUserCircle().pipe(startWith(faImages));
  }

  private loadUserCircle(): Observable<IconDefinition> {
    return of(faImages);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
