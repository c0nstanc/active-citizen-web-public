import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownItem } from 'src/app/core/common/model/menu/drop-down-item.model';
import { Incident } from 'src/app/active-citizen/common/model/incident/incident.model';
import { SubmittableWizardStep } from 'src/app/active-citizen/common/model/wizard/wizard.model';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import { NewIncidentWizardService } from '../../service/new-incident-wizard.service';
import { LoggingService } from 'src/app/core/services/logging.service';
import { IncidentCategories } from 'src/app/active-citizen/common/model/incident/incident-category.enum';

interface IncidentDetails {
  incidentCategory: DropDownItem;
  incidentSubcategory: DropDownItem;
  incidentDesc: string;
}

@Component({
  selector: 'ac-enter-incident-details',
  templateUrl: './enter-incident-details.component.html',
  styleUrls: ['./enter-incident-details.component.scss']
})
export class EnterIncidentDetailsComponent implements OnInit, SubmittableWizardStep, OnDestroy {
  newIncidentForm: FormGroup;
  dropDownIncidentCategories: Array<DropDownItem>;
  filteredDropDownIncidentCategories: Observable<Array<DropDownItem>>;

  subs: SubSink = new SubSink();

  get formControls() {
    return this.newIncidentForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private newIncidentWizardService: NewIncidentWizardService,
    private clonerService: ClonerService,
    private translateService: TranslateService,
    private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.subs.sink = this.translateService.onLangChange.subscribe(() => {
      this.initDropDownIncidentCategories();
      this.translateSelectedOptions();
    });
    this.initDropDownIncidentCategories();
    this.buildForm();


    this.subs.sink = this.newIncidentWizardService.newIncidentUpdated.subscribe((updatedIncident: Incident) => {
      this.updateNewIncidentForm(updatedIncident);
    });
  }


  onCategoryChanged(input: string): void {
    this.newIncidentForm.patchValue(
      { incidentCategory: this.getDropDownItemByInput(input, this.dropDownIncidentCategories) }
    );
  }

  onSubcategoryChanged(input: string): void {
    this.newIncidentForm.patchValue(
      { incidentSubcategory: this.getDropDownItemByInput(input, this.dropDownIncidentCategories) }
    );
  }

  onDescriptionChanged(textAreaInput: string): void {
    this.newIncidentForm.patchValue(
      { incidentDesc: textAreaInput });
  }

  public getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }
  }

  public onSubmit(): void {
    this.saveData();
    this.loggingService.log(this.newIncidentForm.value);
  }

  onSave(): void {
    this.saveData();
    this.loggingService.log(this.newIncidentForm.value);
  }

  private initDropDownIncidentCategories(): void {
    this.dropDownIncidentCategories = [];
    IncidentCategories().forEach(it => this.subs.sink = this.translateService.get('incidentCategory.' + it).subscribe(translation => {
      this.dropDownIncidentCategories = [...this.dropDownIncidentCategories, new DropDownItem('incidentCategory.' + it, it, translation)];
    }));
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      incidentCategory: this.formBuilder.control('', [Validators.required]),
      incidentSubcategory: this.formBuilder.control('', Validators.required),
      incidentDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
    });
  }

  private saveData(): void {
    if (this.newIncidentForm.valid) {
      this.newIncidentWizardService.setIncidentDetails(
        (this.newIncidentForm.value as IncidentDetails).incidentCategory.value,
        (this.newIncidentForm.value as IncidentDetails).incidentSubcategory.value,
        (this.newIncidentForm.value as IncidentDetails).incidentDesc
      );
    }
  }

  private translateSelectedOptions(): void {
    this.newIncidentForm.patchValue({
      incidentCategory: this.getDropDownItemByValue((this.newIncidentForm.value as IncidentDetails).incidentCategory.value)
    });
    this.newIncidentForm.patchValue({
      incidentSubcategory: this.getDropDownItemByValue((this.newIncidentForm.value as IncidentDetails).incidentSubcategory.value)
    });
  }

  private getDropDownItemByValue(value: string): DropDownItem {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.dropDownIncidentCategories.filter(dropDownItem => (dropDownItem.value).toLowerCase()
        .includes(filterValue))[0];
    }
  }

  private getDropDownItemByInput(input: string, dropDownItems: DropDownItem[]): DropDownItem | '' {
    const dropDownItemFound = dropDownItems.find(
      dropDownItem => dropDownItem.translatedName === input);
    return dropDownItemFound ? dropDownItemFound : '';
  }

  private updateNewIncidentForm(updatedIncident: Incident): void {
    if (updatedIncident.category) {
      this.newIncidentForm.patchValue({ incidentCategory: this.getDropDownItemByValue(updatedIncident.category) });
    }
    if (updatedIncident.subcategory) {
      this.newIncidentForm.patchValue({ incidentSubcategory: this.getDropDownItemByValue(updatedIncident.subcategory) });
    }
    if (updatedIncident.description) {
      this.newIncidentForm.patchValue({ incidentDesc: updatedIncident.description });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
