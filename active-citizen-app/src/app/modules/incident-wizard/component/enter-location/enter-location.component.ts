import { Component, OnInit } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { LatLng } from 'src/app/shared/component/my-location-map/model/lat-lng.model';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';
import { LocationDetails } from 'src/app/data/schema/location-details.model';

interface IncidentLocation {
  latLng: LatLng;
  locationAddress: string;
}
@Component({
  selector: 'app-enter-location',
  templateUrl: './enter-location.component.html',
  styleUrls: ['./enter-location.component.scss']
})
export class EnterLocationComponent implements OnInit, SubmittableWizardStep {

  newIncidentForm: FormGroup;

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
    this.newIncidentWizardService.setIncidentLocationDetails(
      new LocationDetails(
        (this.newIncidentForm.value as IncidentLocation).latLng,
        (this.newIncidentForm.value as IncidentLocation).locationAddress)
    );
    console.log(this.newIncidentForm.value);
  }

  onMarkerUpdated(markerlatLng: LatLng): void {
    this.newIncidentForm.patchValue({ latLng: markerlatLng });
  }

  onAddressUpdated(address: string): void {
    this.newIncidentForm.patchValue({ locationAddress: address });
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      latLng: this.formBuilder.control('', [Validators.required]),
      locationAddress: this.formBuilder.control('')
    });
  }

  public getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }
  }
}
