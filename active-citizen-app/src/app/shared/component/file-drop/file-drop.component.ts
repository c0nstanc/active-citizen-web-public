import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ModalService } from '../simple-modal/service/modal.service';
import { ModalSize } from '../simple-modal/model/modal-size.enum';


@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {

  @Input()
  supportedFileTypesCategoty = 'Files';

  @Output()
  selectionChanged = new EventEmitter<File[]>();

  selectedFiles: File[];
  dragging: boolean;


  displayedPhoto: File = null;
  displayedPhotoUrl: any;

  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('myModal') myModal;
  private modalRef;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.selectedFiles = new Array<File>();
    this.dragging = false;
  }

  onSelectionChanged(files: File[]): void {
    Array.from(files).forEach(f => this.selectedFiles.push(f));
    this.selectionChanged.emit(files);
  }

  onDragging(dragging: boolean): void {
    this.dragging = dragging;
  }


  removeFile(fileIndex: number): void {
    if (fileIndex >= 0) {
      this.selectedFiles.splice(fileIndex, 1);
    }
  }

  selectedFileOnClick(file: File): void {
    this.openModal(file);
  }



  openModal(file: File): void {
    this.loadPhoto(file);
    this.modalRef = this.modalService.open(this.myModal, {
      modalClass: 'image-modal',
      hideCloseButton: false,
      hideFooterArea: true,
      verticallyCentered: true,
      backdrop: true,
      isStaticBackdrop: false,
      animation: true,
      listenToKeyboard: false,
      closeOnOutsideClick: true,
      backdropClass: 'modal-backdrop'
    });
  }



  closeModal() {
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
  }

  public clearFileSelection(): void {
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.splice(0, this.selectedFiles.length);
      this.selectionChanged.emit(this.selectedFiles);
    }
  }

  private loadPhoto(file: File): void {

    if (file.type.match(/image\/*/) != null) {
      this.displayedPhoto = file;
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.displayedPhoto);
      reader.onload = (event: ProgressEvent) => {
        if (event.loaded) {
          this.displayedPhotoUrl = reader.result;
        }
      };
    }

  }
}
