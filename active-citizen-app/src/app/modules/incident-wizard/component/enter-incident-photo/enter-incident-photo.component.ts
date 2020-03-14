import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';


interface IncidentPhoto {
  incidentImageUrls: string[];
}

@Component({
  selector: 'app-enter-incident-photo',
  templateUrl: './enter-incident-photo.component.html',
  styleUrls: ['./enter-incident-photo.component.scss']
})
export class EnterIncidentPhotoComponent implements OnInit, SubmittableWizardStep {

  newIncidentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clonerService: ClonerService,
    private newIncidentWizardService: NewIncidentWizardService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    console.log('Submitting Photo ...');

    this.newIncidentWizardService.setIncidentUrls(
      (this.newIncidentForm.value as IncidentPhoto).incidentImageUrls);

    console.log(this.newIncidentForm.value);

  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      incidentImageUrls: this.formBuilder.array([])
    });
  }

  public getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }

  }

  onSelectionChanged(files: File[]): void {
    (this.newIncidentForm.value as IncidentPhoto).incidentImageUrls = [];
    files.forEach(file => {
      if (file.type.match(/image\/*/) != null) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: ProgressEvent) => {
          if (event.loaded) {
            (this.newIncidentForm.value as IncidentPhoto).incidentImageUrls.push(reader.result as string);
          }
        };
      }
    });
  }

}
