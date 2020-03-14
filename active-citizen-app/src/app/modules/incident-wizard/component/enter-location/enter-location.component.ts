import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { GoogleMapComponent } from 'src/app/shared/component/google-map/google-map.component';
import { LatLng } from 'src/app/shared/component/google-map/model/lat-lng.model';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';

interface IncidentLocation {
  latLng: LatLng;
}
@Component({
  selector: 'app-enter-location',
  templateUrl: './enter-location.component.html',
  styleUrls: ['./enter-location.component.scss']
})
export class EnterLocationComponent implements OnInit, SubmittableWizardStep {

  newIncidentForm: FormGroup;


  @ViewChild('incidentLocation')
  incidentLocation: GoogleMapComponent;

  constructor(
    private formBuilder: FormBuilder,
    private clonerService: ClonerService,
    private newIncidentWizardService: NewIncidentWizardService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }


  public onSubmit(): void {

    console.log('Submitting Location ...');
    this.newIncidentWizardService.setIncidentLatLng(
      (this.newIncidentForm.value as IncidentLocation).latLng
    );
    console.log(this.newIncidentForm.value);
  }

  onMarkerUpdated(): void {
    this.newIncidentForm.patchValue({ latLng: this.incidentLocation.getMarkerLocation() });
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      latLng: this.formBuilder.control('', [Validators.required]),
    });
  }


  public getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }
  }
}
