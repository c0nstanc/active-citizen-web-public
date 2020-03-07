import { Component, OnInit } from '@angular/core';
import { Step } from './model/step.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-incident-wizard-stepper',
  templateUrl: './new-incident-wizard-stepper.component.html',
  styleUrls: ['./new-incident-wizard-stepper.component.scss']
})
export class NewIncidentWizardStepperComponent implements OnInit {

  steps: Step[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.steps = [new Step('Enter location', 'Submit Location'),
    new Step('Enter details', 'Submit Details'),
    new Step('Enter photo', 'Submit Photos'),
      // new Step('Enter picture', 'Submit Picture')
    ];
  }

  selectionChanged(event: any): void {
    this.navigate('step' + event.selectedIndex);
  }

  private navigate(url: string): void {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
  }

}
