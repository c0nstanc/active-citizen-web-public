import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {


  selectedFile: File = null;
  public imagePath: string;
  imgURL: any;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onLocationConfirmed(): void {
    this.router.navigate(['incidents/new-incident/1']);
  }

  onImageSelected(files: File[]): void {

    if (files[0].type.match(/image\/*/) != null) {
      this.selectedFile = files[0];
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: ProgressEvent) => {
        if (event.loaded) {
          this.imgURL = reader.result;
        }
      };
    }
  }
  //   this.labelFileUpload.nativeElement.innerText = Array.from(files).filter(f => f.type.match(/image\/*/) != null)
  //     .map(f => f.name)
  //     .join(', ');
  // }

  // onFileComplete(data: any) {
  //   console.log(data); // We just print out data bubbled up from event emitter.
  // }

  onInputChanged(test: any) {
    this.onImageSelected(test);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
