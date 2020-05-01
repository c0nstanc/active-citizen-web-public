import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';
import { SubSink } from 'subsink';



interface IncidentPhotos {
  files: File[];
}

@Component({
  selector: 'app-enter-incident-photo',
  templateUrl: './enter-incident-photo.component.html',
  styleUrls: ['./enter-incident-photo.component.scss']
})
export class EnterIncidentPhotoComponent implements OnInit, SubmittableWizardStep, OnDestroy {

  newIncidentForm: FormGroup;
  subs: SubSink = new SubSink();

  constructor(
    private formBuilder: FormBuilder,
    private clonerService: ClonerService,
    private newIncidentWizardService: NewIncidentWizardService) { }

  ngOnInit(): void {
    this.buildForm();
    this.subs.sink = this.newIncidentWizardService.newIncidentFilesUpdated.subscribe((updatedFiles: File[]) => {
      this.onSelectionChanged(updatedFiles);
    });

  }

  public onSubmit(): void {
    console.log('Submitting Photo ...');
    this.saveData();
    console.log(this.newIncidentForm.value);
  }

  onSave(): void {
    this.saveData();
  }

  private saveData() {
    this.newIncidentWizardService.setIncidentFiles(
      (this.newIncidentForm.value as IncidentPhotos).files);
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      files: this.formBuilder.array([])
    });
  }

  public getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }

  }

  onSelectionChanged(files: File[]): void {
    (this.newIncidentForm.value as IncidentPhotos).files = files;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
