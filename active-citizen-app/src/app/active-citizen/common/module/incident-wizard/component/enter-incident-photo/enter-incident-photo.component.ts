import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubmittableWizardStep } from 'src/app/active-citizen/common/model/wizard/wizard.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { NewIncidentWizardService } from '../../service/new-incident-wizard.service';
import { LoggingService } from 'src/app/core/services/logging/logging.service';
import { ClonerUtils } from 'src/app/core/util/clone/cloner-utils.model';



interface IncidentPhotos {
  files: File[];
}

@Component({
  selector: 'ac-enter-incident-photo',
  templateUrl: './enter-incident-photo.component.html',
  styleUrls: ['./enter-incident-photo.component.scss']
})
export class EnterIncidentPhotoComponent implements OnInit, SubmittableWizardStep, OnDestroy {

  newIncidentForm: FormGroup;
  subs: SubSink = new SubSink();

  constructor(
    private formBuilder: FormBuilder,
    private newIncidentWizardService: NewIncidentWizardService,
    private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.buildForm();
    this.subs.sink = this.newIncidentWizardService.newIncidentFilesUpdated.subscribe((updatedFiles: File[]) => {
      this.onSelectionChanged(updatedFiles);
    });

  }

  public onSubmit(): void {
    this.loggingService.log('Submitting Photo ...');
    this.saveData();
    this.loggingService.log(this.newIncidentForm.value);
  }

  onSave(): void {
    this.saveData();
  }

  private saveData(): void {
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
      return ClonerUtils.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }

  }

  onSelectionChanged(files: File[]): void {
    (this.newIncidentForm.value as IncidentPhotos).files = files;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
