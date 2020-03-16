import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownItem } from 'src/app/shared/model/drop-down-item.model';
import { Incident } from 'src/app/data/schema/incident.model';
import { IncidentTypes } from 'src/app/modules/incidents/model/incident-type.enum';
import { NewIncidentWizardService } from '../new-incident-wizard-stepper/service/new-incident-wizard.service';
import { SubmittableWizardStep } from 'src/app/core/common/model/wizard.model';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

interface IncidentDetails {
  incidentTitle: string;
  incidentType: string;
  translatedIncidentType: string;
  incidentDesc: string;
}

@Component({
  selector: 'app-enter-incident-details',
  templateUrl: './enter-incident-details.component.html',
  styleUrls: ['./enter-incident-details.component.scss']
})
export class EnterIncidentDetailsComponent implements OnInit, SubmittableWizardStep {
  newIncidentForm: FormGroup;
  dropDownIncidentTypes: Array<DropDownItem>;
  incident: Incident;
  filteredDropDownIncidentTypes: Observable<Array<DropDownItem>>;

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
    this.initDropDownIncidentTypes();
    this.translateService.onLangChange.subscribe(() =>
      this.initDropDownIncidentTypes()
    );
    this.buildForm();
    this.filteredDropDownIncidentTypes = this.formControls['translatedIncidentType'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private initDropDownIncidentTypes(): void {
    this.dropDownIncidentTypes = new Array<DropDownItem>();
    IncidentTypes().forEach(it => this.translateService.get('incidentType.' + it).subscribe(translation => {
      this.dropDownIncidentTypes.push(new DropDownItem('incidentType.' + it, it, translation));
    }));
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      incidentTitle: this.formBuilder.control('', [Validators.minLength(4)]),
      incidentType: this.formBuilder.control('', Validators.required),
      translatedIncidentType: this.formBuilder.control('', Validators.required),
      incidentDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
    });
  }

  public getFormGroup(): FormGroup {
    if (this.newIncidentForm) {
      return this.clonerService.cloneFormGroup(this.newIncidentForm) as FormGroup;
    }

  }

  onIncidentTypeChanged(translatedName: string) {

    const selectedIncident = this.dropDownIncidentTypes.find(
      dropDownItem => dropDownItem.translatedName === translatedName);

    if (selectedIncident) {
      this.newIncidentForm.patchValue({ incidentType: selectedIncident.value })
    } else {
      this.newIncidentForm.patchValue({
        incidentType: '',
        translatedIncidentType: ''
      });
    }
  }

  public onSubmit(): void {
    if (this.newIncidentForm.valid) {
      this.newIncidentWizardService.setIncidentName((this.newIncidentForm.value as IncidentDetails).incidentTitle);
      this.newIncidentWizardService.setIncidentDescription((this.newIncidentForm.value as IncidentDetails).incidentDesc);
      this.newIncidentWizardService.setIncidentCategory((this.newIncidentForm.value as IncidentDetails).incidentType);
    }
    console.log(this.newIncidentForm.value);
  }

  private _filter(value: string): DropDownItem[] {
    const filterValue = value.toLowerCase();
    return this.dropDownIncidentTypes.filter(dropDownItem => (dropDownItem.translatedName).toLowerCase()
      .includes(filterValue));
  }

}
