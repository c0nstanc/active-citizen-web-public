import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownItem } from 'src/app/shared/model/drop-down-item.model';
import { Incident } from 'src/app/data/schema/incident.model';
import { TranslateService } from '@ngx-translate/core';
import { IncidentTypes } from 'src/app/modules/incidents/model/incident-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-incident-details',
  templateUrl: './enter-incident-details.component.html',
  styleUrls: ['./enter-incident-details.component.scss']
})
export class EnterIncidentDetailsComponent implements OnInit {
  newIncidentForm: FormGroup;
  dropDownIncidentTypes: Array<DropDownItem>;
  incident: Incident;

  get f() {
    return this.newIncidentForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initDropDownIncidentTypes();
    this.translateService.onLangChange.subscribe(() => {
      this.initDropDownIncidentTypes();
    });

    this.buildForm();
  }

  private initDropDownIncidentTypes(): void {
    this.dropDownIncidentTypes = new Array<DropDownItem>();
    IncidentTypes().forEach(it => {
      this.dropDownIncidentTypes.push(new DropDownItem(this.translateService.instant('incidentType.' + it), it));
    });
  }

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      incidentTitle: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      incidentType: this.formBuilder.control('', Validators.required),
      incidentDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
    });

  }

  onSubmit(): void {

    console.log(this.newIncidentForm.value);
    this.router.navigate(['incidents/new-incident/2']);

  }
}
