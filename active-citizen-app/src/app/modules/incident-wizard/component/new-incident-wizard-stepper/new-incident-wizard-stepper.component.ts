import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Step } from './model/step.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-incident-wizard-stepper',
  templateUrl: './new-incident-wizard-stepper.component.html',
  styleUrls: ['./new-incident-wizard-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewIncidentWizardStepperComponent implements OnInit {

  private currentWizardStep: SubmittableWizardStep;

  steps: Step[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.steps = [new Step('Enter location', 'Submit Location'),
    new Step('Enter details', 'Submit Details'),
    new Step('Enter photo', 'Submit Photos'),
    ];
  }

  selectionChanged(event: any): void {
    this.navigate('step' + event.selectedIndex);
  }

  onRouterOutletActivate(loadedStep: SubmittableWizardStep) {
    this.currentWizardStep = loadedStep;
  }

  submit() {
    this.currentWizardStep.onSubmit();
  }

  private navigate(url: string): void {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
  }

}
