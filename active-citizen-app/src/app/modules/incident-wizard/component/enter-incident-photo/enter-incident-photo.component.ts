import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter-incident-photo',
  templateUrl: './enter-incident-photo.component.html',
  styleUrls: ['./enter-incident-photo.component.scss']
})
export class EnterIncidentPhotoComponent implements OnInit {
  newIncidentForm: FormGroup;

  selectedFile: File = null;
  public imagePath: string;
  imgURL: any;

  @ViewChild('labelFileUpload')
  labelFileUpload: ElementRef;



  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

  }

  onLocationConfirmed(): void {
    this.router.navigate(['incidents/new-incident/1']);
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

  private buildForm(): void {
    this.newIncidentForm = this.formBuilder.group({
      incidentTitle: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      incidentType: this.formBuilder.control('', Validators.required),
      incidentDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
    });
  }

  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }
}
