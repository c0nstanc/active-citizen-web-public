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
    this.setFormIncidentCategory(this.getDropDownItemByInput(input, this.dropDownIncidentCategories))
  }

  onSubcategoryChanged(input: string): void {
    this.setFormIncidentSubcategory(this.getDropDownItemByInput(input, this.dropDownIncidentCategories));
  }

  onDescriptionChanged(textAreaInput: string): void {
    this.setFormIncidentDescription(textAreaInput);
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

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      incidentCategory: this.formBuilder.control('', [Validators.required]),
      incidentSubcategory: this.formBuilder.control('', Validators.required),
      incidentDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
    });
  }

  private initDropDownIncidentCategories(): void {
    this.dropDownIncidentCategories = [];
    IncidentCategories().forEach(it => this.subs.sink = this.translateService.get('incidentCategory.' + it).subscribe(translation => {
      this.dropDownIncidentCategories = [...this.dropDownIncidentCategories, new DropDownItem('incidentCategory.' + it, it, translation)];
    }));
  }

  private saveData(): void {
    if (this.newIncidentForm.valid) {
      this.newIncidentWizardService.setIncidentDetails(
        this.getFormIncidentCategory()?.value,
        this.getFormIncidentSubcategory()?.value,
        this.getFormIncidentDescription()
      );
    }
  }

  private getFormIncidentCategory(): DropDownItem {
    return (this.newIncidentForm.value as IncidentDetails).incidentCategory;
  }

  private getFormIncidentSubcategory(): DropDownItem {
    return (this.newIncidentForm.value as IncidentDetails).incidentSubcategory;
  }

  private getFormIncidentDescription(): string {
    return (this.newIncidentForm.value as IncidentDetails).incidentDesc
  }

  private setFormIncidentCategory(dropDownItem: DropDownItem): void {
    this.newIncidentForm.patchValue({ incidentCategory: dropDownItem ? dropDownItem : '' });
  }

  private setFormIncidentSubcategory(dropDownItem: DropDownItem): void {
    this.newIncidentForm.patchValue({ incidentSubcategory: dropDownItem ? dropDownItem : '' });
  }

  private setFormIncidentDescription(textArea: string): void {
    this.newIncidentForm.patchValue({ incidentDesc: textArea });
  }

  private translateSelectedOptions(): void {
    this.setFormIncidentCategory(this.getDropDownItemByValue(this.getFormIncidentCategory()?.value));
    this.setFormIncidentSubcategory(this.getDropDownItemByValue(this.getFormIncidentSubcategory()?.value));
  }

  private getDropDownItemByValue(value: string): DropDownItem {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.dropDownIncidentCategories.filter(dropDownItem => (dropDownItem.value).toLowerCase()
        .includes(filterValue))[0];
    } else {
      return null;
    }
  }

  private getDropDownItemByInput(input: string, dropDownItems: DropDownItem[]): DropDownItem {
    const dropDownItemFound = dropDownItems.find(
      dropDownItem => dropDownItem.translatedName === input);
    return dropDownItemFound ? dropDownItemFound : null;
  }

  private updateNewIncidentForm(updatedIncident: Incident): void {
    if (updatedIncident.category) {
      this.newIncidentForm.patchValue({ incidentCategory: this.getDropDownItemByValue(updatedIncident.category) });
    }
    if (updatedIncident.subcategory) {
      this.newIncidentForm.patchValue({ incidentSubcategory: this.getDropDownItemByValue(updatedIncident.subcategory) });
    }
    this.setFormIncidentDescription(updatedIncident?.description);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
