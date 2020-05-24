import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownItem } from 'src/app/core/common/model/menu/drop-down-item.model';
import { Incident } from 'src/app/data/schema/incident.model';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import { NewIncidentWizardService } from '../../service/new-incident-wizard.service';
import { LoggingService } from 'src/app/core/services/logging.service';
import { IncidentCategories } from '../../../model/incident-category.enum';

interface IncidentDetails {
  incidentCategory: string;
  translatedIncidentCategory: string;
  incidentSubcategory: string;
  translatedIncidentSubcategory: string;
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
    this.initDropDownIncidentCategories();
    this.buildForm();

    this.subs.sink = this.translateService.onLangChange.subscribe(() => {

      this.initDropDownIncidentCategories();

      this.newIncidentForm.patchValue({
        translatedIncidentCategory: this.getTranslatedCategoryByValue(
          (this.newIncidentForm.value as IncidentDetails).incidentCategory)
      });
      this.newIncidentForm.patchValue({
        translatedIncidentSubcategory: this.getTranslatedCategoryByValue(
          (this.newIncidentForm.value as IncidentDetails).incidentSubcategory)
      });
    }

    );
    const field = 'translatedIncidentCategory';
    this.formControls[field].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    ).subscribe(values => {
      this.filteredDropDownIncidentCategories = of(values);
    });

    this.subs.sink = this.newIncidentWizardService.newIncidentUpdated.subscribe((updatedIncident: Incident) => {
      if (updatedIncident.category) {
        this.onIncidentCategoryChanged(this.getTranslatedCategoryByValue(updatedIncident.category));
      }
      if (updatedIncident.subcategory) {
        this.onIncidentSubcategoryChanged(this.getTranslatedCategoryByValue(updatedIncident.subcategory));
      }
      if (updatedIncident.description) {
        this.newIncidentForm.patchValue({ incidentDesc: updatedIncident.description });
      }
    });
  }

  private initDropDownIncidentCategories(): void {
    this.dropDownIncidentCategories = new Array<DropDownItem>();
    IncidentCategories().forEach(it => this.subs.sink = this.translateService.get('incidentCategory.' + it).subscribe(translation => {
      this.dropDownIncidentCategories.push(new DropDownItem('incidentCategory.' + it, it, translation));
    }));
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      incidentCategory: this.formBuilder.control('', [Validators.minLength(4)]),
      translatedIncidentCategory: this.formBuilder.control('', Validators.required),
      incidentSubcategory: this.formBuilder.control('', Validators.required),
      translatedIncidentSubcategory: this.formBuilder.control('', Validators.required),
      incidentDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
    });
  }

  public getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }
  }

  onIncidentCategoryChanged(translatedName: string) {

    const selectedIncidentCategory = this.dropDownIncidentCategories.find(
      dropDownItem => dropDownItem.translatedName === translatedName);

    if (selectedIncidentCategory) {
      this.newIncidentForm.patchValue({ incidentCategory: selectedIncidentCategory.value });
      this.newIncidentForm.patchValue({ translatedIncidentCategory: selectedIncidentCategory.translatedName });

    } else {
      this.newIncidentForm.patchValue({
        incidentCategory: '',
        translatedIncidentCategory: ''
      });
    }
  }

  onIncidentSubcategoryChanged(translatedName: string) {
    const selectedIncidentSubcategory = this.dropDownIncidentCategories.find(
      dropDownItem => dropDownItem.translatedName === translatedName);

    if (selectedIncidentSubcategory) {
      this.newIncidentForm.patchValue({ incidentSubcategory: selectedIncidentSubcategory.value });
      this.newIncidentForm.patchValue({ translatedIncidentSubcategory: selectedIncidentSubcategory.translatedName });
    } else {
      this.newIncidentForm.patchValue({
        incidentSubcategory: '',
        translatedIncidentSubcategory: ''
      });
    }
  }

  public onSubmit(): void {
    this.saveData();
    this.loggingService.log(this.newIncidentForm.value);
  }

  onSave(): void {
    this.saveData();
  }

  private saveData() {
    if (this.newIncidentForm.valid) {
      this.newIncidentWizardService.setIncidentDetails(
        (this.newIncidentForm.value as IncidentDetails).incidentCategory,
        (this.newIncidentForm.value as IncidentDetails).incidentSubcategory,
        (this.newIncidentForm.value as IncidentDetails).incidentDesc
      );
    }
  }

  private _filter(value: string): DropDownItem[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.dropDownIncidentCategories.filter(dropDownItem => (dropDownItem.translatedName).toLowerCase()
        .includes(filterValue));
    }
    return this.dropDownIncidentCategories;
  }

  private getTranslatedCategoryByValue(value: string): string {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.dropDownIncidentCategories.filter(dropDownItem => (dropDownItem.value).toLowerCase()
        .includes(filterValue))[0].translatedName;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
