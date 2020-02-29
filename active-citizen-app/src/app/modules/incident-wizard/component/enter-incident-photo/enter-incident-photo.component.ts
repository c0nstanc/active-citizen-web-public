import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter-incident-photo',
  templateUrl: './enter-incident-photo.component.html',
  styleUrls: ['./enter-incident-photo.component.scss']
})
export class EnterIncidentPhotoComponent implements OnInit {

  selectedFile: File = null;
  public imagePath: string;
  imgURL: any;

  @ViewChild('labelFileUpload')
  labelFileUpload: ElementRef;



  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onLocationConfirmed(): void {
    this.router.navigate(['incidents/new-incident/1']);
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

  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }
}
