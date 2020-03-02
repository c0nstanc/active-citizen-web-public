import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalComponent } from 'src/app/modules/incidents/modal/my-modal.component';


@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {

  @Output()
  selectionChanged = new EventEmitter<File[]>();

  selectedFiles: File[];
  dragging: boolean;


  selectedFile: File = null;
  imgURL: any;

  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.selectedFiles = new Array<File>();
    this.dragging = false;
  }

  onSelectionChanged(files: File[]): void {
    Array.from(files).forEach(f => this.selectedFiles.push(f));
    this.selectionChanged.emit(files);
    this.computeImageUrl(files[0]);
  }

  onDragging(dragging: boolean): void {
    this.dragging = dragging;
  }

  public clearFileSelection(): void {
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.splice(0, this.selectedFiles.length);
      this.selectionChanged.emit(this.selectedFiles);
    }
  }

  private computeImageUrl(file: File): void {

    if (file.type.match(/image\/*/) != null) {
      this.selectedFile = file;
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: ProgressEvent) => {
        if (event.loaded) {
          this.imgURL = reader.result;
        }
      };
    }

  }

  removeFile(fileIndex: number): void {
    if (fileIndex >= 0) {
      this.selectedFiles.splice(fileIndex, 1);
    }
  }

  selectedFileOnClick(event: any): void {
    this.openMyModal();
  }


  openMyModal() {
    const modalRef = this.modalService.open(MyModalComponent);
    modalRef.componentInstance.id = 1;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
