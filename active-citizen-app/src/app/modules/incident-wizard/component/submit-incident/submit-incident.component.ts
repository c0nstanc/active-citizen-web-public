import { Component, OnInit } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-incident',
  templateUrl: './submit-incident.component.html',
  styleUrls: ['./submit-incident.component.scss']
})
export class SubmitIncidentComponent implements OnInit, SubmittableWizardStep {


  newIncidentForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private clonerService: ClonerService,
    private newIncidentWizardService: NewIncidentWizardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }
  }

  onSubmit(): void {
    this.newIncidentWizardService.submitIncident();
    this.router.navigate(['incidents/my-incidents']);
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({});

  }

}
