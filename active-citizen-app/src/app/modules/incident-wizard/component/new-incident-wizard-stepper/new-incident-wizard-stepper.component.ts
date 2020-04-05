import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Step } from './model/step.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { CdkStep } from '@angular/cdk/stepper';

@Component({
  selector: 'app-new-incident-wizard-stepper',
  templateUrl: './new-incident-wizard-stepper.component.html',
  styleUrls: ['./new-incident-wizard-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewIncidentWizardStepperComponent implements OnInit, AfterViewInit {

  currentWizardStep: SubmittableWizardStep;

  @ViewChild('stepper')
  matStepper: MatHorizontalStepper;

  selectedIndex: number;
  steps: Step[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ref: ElementRef
  ) { }

  ngOnInit(): void {
    this.steps = [
      new Step('Enter location', 'Proceed'),
      new Step('Enter details', 'Proceed'),
      new Step('Enter photo', 'Proceed'),
      new Step('Done', 'Submit Problem'),
    ];
    this.selectedIndex = this.getStepIndex();
  }

  ngAfterViewInit(): void {
    this.markStepperHeaderAsProgressed();
  }

  selectionChanged(event: any): void {
    this.getCurrentStep().editable = true;
    this.getCurrentStep().completed = true;
    this.currentWizardStep.onSubmit();
    this.navigate('step' + (event.selectedIndex + 1));
  }

  onRouterOutletActivate(loadedStep: SubmittableWizardStep): void {
    this.currentWizardStep = loadedStep;
    this.markStepperHeaderAsProgressed();
  }

  submit(): void {
    this.currentWizardStep.onSubmit();
  }

  private navigate(url: string): void {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
  }

  private getCurrentStep(): CdkStep {
    return this.matStepper.steps.toArray()[this.getStepIndex()];
  }

  private getStepIndex(): number {

    const stepNumber = this.router.url.split('/').find(urlPart => urlPart.includes('step'));
    if (stepNumber) {
      return +this.router.url.split('/').find(urlPart => urlPart.includes('step')).replace('step', '') - 1;
    }
    return 0;
  }

  private markStepperHeaderAsProgressed(): void {
    if (this.ref) {
      let index = 0;
      for (const element of this.ref.nativeElement.children[0].children[0].children) {
        if (index <= this.getStepIndex()) {
          element.classList.add('progressed');
        } else {
          element.classList.remove('progressed');
        }
        if (element.tagName !== 'DIV') {
          index++;
        }
      }
    }
  }

}
