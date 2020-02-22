import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Incident } from 'src/app/data/schema/incident.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


interface IncidentTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-incident-item',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
  newIncidentForm: FormGroup;

  selectedFile: File = null;

  public imagePath: string;
  imgURL: any;

  incident: Incident;


  @ViewChild('labelFileUpload')
  labelFileUpload: ElementRef;

  selectedValue: string;
  selectedCar: string;

  IncidentTypes: IncidentTypes[] = [
    { value: 'water', viewValue: 'Water' },
    { value: 'road', viewValue: 'Road' },
    { value: 'electricity', viewValue: 'Electricity' },
    { value: 'other', viewValue: 'Other' }

  ];

  get f() {
    return this.newIncidentForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
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
  }

  onImageSelected(files: FileList): void {




    if (files.item(0).type.match(/image\/*/) != null) {
      this.selectedFile = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: ProgressEvent) => {
        if (event.loaded) {
          this.imgURL = reader.result;
        }
      };
    }

    this.labelFileUpload.nativeElement.innerText = Array.from(files).filter(f => f.type.match(/image\/*/) != null)
      .map(f => f.name)
      .join(', ');


  }
}
