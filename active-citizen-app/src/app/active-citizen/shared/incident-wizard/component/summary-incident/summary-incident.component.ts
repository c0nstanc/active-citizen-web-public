import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { Router } from '@angular/router';
import { Incident } from 'src/app/data/schema/incident.model';
import { SubSink } from 'subsink';
import { NewIncidentWizardService } from '../../service/new-incident-wizard.service';
import { IncidentMapComponent } from '../../../incident-maps/component/incident-map/incident-map.component';
import { ImageSlide } from 'src/app/core/common/model/carousel/image-slide.model';

@Component({
  selector: 'ac-summary-incident',
  templateUrl: './summary-incident.component.html',
  styleUrls: ['./summary-incident.component.scss'],
})
export class SummaryIncidentComponent implements OnInit, SubmittableWizardStep, OnDestroy {

  incident: Incident;
  imageSlides: ImageSlide[] = [];

  @ViewChild('incidentMap', { static: true })
  incidentMap: IncidentMapComponent;

  subs: SubSink = new SubSink();

  constructor(
    private formBuilder: FormBuilder,
    private clonerService: ClonerService,
    private newIncidentWizardService: NewIncidentWizardService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }



  ngOnInit(): void {
    this.subs.sink = this.newIncidentWizardService.newIncidentUpdated.subscribe(
      (newIncident: Incident) => {
        this.incident = newIncident;
        this.imageSlides = [];
        this.incident.imageUrls.forEach(iu => this.imageSlides = [...this.imageSlides, new ImageSlide(iu)]);
        this.changeDetectorRef.detectChanges();
        if (this.incidentMap) {
          this.incidentMap.intilalizeMap(this.incident.locationDetails.latLng);
        }
      }
    );
  }

  getFormGroup(): FormGroup {
    return this.clonerService.cloneFormGroup(this.buildForm()) as FormGroup;
  }

  onSubmit(): void {
    this.newIncidentWizardService.submitIncident();
    this.router.navigate(['incidents/']);
  }

  onSave(): void {
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
