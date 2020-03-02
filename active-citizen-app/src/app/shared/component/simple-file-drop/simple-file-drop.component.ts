import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RejectionReasons } from './model/rejection-reasons.model';
import { FileRejection } from './model/file-rejection.model';


@Component({
  selector: 'app-simple-file-drop',
  templateUrl: './simple-file-drop.component.html',
  styleUrls: ['./simple-file-drop.component.scss']
})

export class SimpleFileDropComponent {

  @Input()
  allowedExtensions: string;
  @Input()
  maxFileSize: number;
  @Input()
  containerDivClass = '';

  @Output()
  selectionChanged = new EventEmitter<File[]>();
  @Output()
  filesRejected = new EventEmitter<FileRejection[]>();
  @Output()
  dragging = new EventEmitter<boolean>();


  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  constructor() { }


  selectedFiles: File[] = new Array<File>();


  public filesSelected(): boolean {
    return this.selectedFiles.length > 0;
  }

  public getAllowedExtensionsArray(): string[] {
    return this.allowedExtensions != null ? this.allowedExtensions.split(',') : null;
  }

  selectFiles(filesToSelect: File[]): void {
    const rejectedFiles = new Array<FileRejection>();

    if (this.selectedFiles.length > 0) {
      this.selectedFiles = new Array<File>();
    }

    Array.from(filesToSelect).forEach(file => {
      if (this.maxFileSize != null && file.size > this.maxFileSize) {
        rejectedFiles.push(new FileRejection(file, RejectionReasons.FileSize));
      } else if (this.getAllowedExtensionsArray() != null &&
        this.getAllowedExtensionsArray().filter(extension => file.name.endsWith(`.${extension}`)).length === 0) {
        rejectedFiles.push(new FileRejection(file, RejectionReasons.FileType));
      } else {
        this.selectedFiles.push(file);
      }
    });

    this.selectionChanged.emit(this.selectedFiles);

    if (rejectedFiles.length > 0) {
      this.filesRejected.emit(rejectedFiles);
    }
  }


  onChange(selectedFiles: File[]): void {
    if (selectedFiles.length > 0) {
      this.selectFiles(selectedFiles);
      this.fileInput.nativeElement.value = null;
    }
  }


  onDragEnter(event: any): void {
    event.preventDefault();
    this.dragging.emit(true);
  }


  onDragLeave(event: any): void {
    this.dragging.emit(false);
  }

  onDragOver(event: any): void {
    event.preventDefault();
  }


  onDrop(event: any): void {
    event.preventDefault();
    this.dragging.emit(false);
    this.selectFiles(Array.from(event.dataTransfer.files));
  }
}
