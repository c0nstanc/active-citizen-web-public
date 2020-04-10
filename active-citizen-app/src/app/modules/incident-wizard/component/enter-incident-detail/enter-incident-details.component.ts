import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownItem } from 'src/app/shared/model/drop-down-item.model';
import { Incident } from 'src/app/data/schema/incident.model';
import { IncidentCategories } from 'src/app/modules/incidents/model/incident-category.enum';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';

interface IncidentDetails {
  incidentCategory: string;
  translatedIncidentCategory: string;
  incidentSubcategory: string;
  translatedIncidentSubcategory: string;
  incidentDesc: string;
}

@Component({
  selector: 'app-enter-incident-details',
  templateUrl: './enter-incident-details.component.html',
  styleUrls: ['./enter-incident-details.component.scss']
})
export class EnterIncidentDetailsComponent implements OnInit, SubmittableWizardStep, OnDestroy {
  newIncidentForm: FormGroup;
  dropDownIncidentCategories: Array<DropDownItem>;
  incident: Incident;
  filteredDropDownIncidentCategories: Observable<Array<DropDownItem>>;

  subs: SubSink = new SubSink();

  get formControls() {
    return this.newIncidentForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private newIncidentWizardService: NewIncidentWizardService,
    private clonerService: ClonerService,
    private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.initDropDownIncidentCategories();
    this.subs.sink = this.translateService.onLangChange.subscribe(() =>
      this.initDropDownIncidentCategories()
    );
    this.buildForm();
    this.filteredDropDownIncidentCategories = this.formControls['translatedIncidentCategory'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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
    } else {
      this.newIncidentForm.patchValue({
        incidentSubcategory: '',
        translatedIncidentSubcategory: ''
      });
    }
  }

  public onSubmit(): void {
    if (this.newIncidentForm.valid) {
      this.newIncidentWizardService.setIncidentCategory((this.newIncidentForm.value as IncidentDetails).incidentCategory);
      this.newIncidentWizardService.setIncidentSubcategory((this.newIncidentForm.value as IncidentDetails).incidentSubcategory);
      this.newIncidentWizardService.setIncidentDescription((this.newIncidentForm.value as IncidentDetails).incidentDesc);
      console.log(this.newIncidentForm.value);
    }
  }

  private _filter(value: string): DropDownItem[] {
    const filterValue = value.toLowerCase();
    return this.dropDownIncidentCategories.filter(dropDownItem => (dropDownItem.translatedName).toLowerCase()
      .includes(filterValue));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
