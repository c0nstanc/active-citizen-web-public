import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { LatLng } from 'src/app/shared/component/map/my-location-map/model/lat-lng.model';
import { LocationDetails } from 'src/app/data/schema/location-details.model';
import { Incident } from 'src/app/data/schema/incident.model';
import { SubSink } from 'subsink';
import { NewIncidentWizardService } from '../../service/new-incident-wizard.service';

interface IncidentLocation {
  latLng: LatLng;
  locationAddress: string;
}
@Component({
  selector: 'ac-enter-location',
  templateUrl: './enter-location.component.html',
  styleUrls: ['./enter-location.component.scss']
})
export class EnterLocationComponent implements OnInit, SubmittableWizardStep, OnDestroy {

  newIncidentForm: FormGroup;
  subs: SubSink = new SubSink();


  constructor(
    private formBuilder: FormBuilder,
    private clonerService: ClonerService,
    private newIncidentWizardService: NewIncidentWizardService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.subs.sink = this.newIncidentWizardService.newIncidentUpdated.subscribe((updatedIncident: Incident) => {
      if (updatedIncident.locationDetails) {
        this.onMarkerUpdated(updatedIncident.locationDetails.latLng);
        this.onAddressUpdated(updatedIncident.locationDetails.address)
      }
    });

  }

  public onSubmit(): void {
    console.log('Submitting Location ...');
    this.saveData();
    console.log(this.newIncidentForm.value);
  }

  onSave(): void {
    this.saveData();
  }

  private saveData() {
    this.newIncidentWizardService.setIncidentLocationDetails(
      new LocationDetails(
        (this.newIncidentForm.value as IncidentLocation).latLng,
        (this.newIncidentForm.value as IncidentLocation).locationAddress)
    );
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
