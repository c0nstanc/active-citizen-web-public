import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {

  @Input()
  maxFiles = 4;

  @Input()
  supportedFileTypesCategory: string;

  @Input()
  selectedFiles: File[];

  @Output()
  selectionChanged = new EventEmitter<File[]>();

  numOfSelectedFiles: number;

  @ViewChild('imageViewer') imageViewer: ImageViewerComponent;

  ngOnInit(): void {
    if (!this.selectedFiles) {
      this.selectedFiles = new Array<File>();
      this.numOfSelectedFiles = 0;
    } else {
      this.numOfSelectedFiles = this.selectedFiles.length;
    }
  }

  onSelectionChanged(files: File[]): void {
    Array.from(files).forEach(file => {
      if (this.numOfSelectedFiles < this.maxFiles) {
        this.selectedFiles.push(file);
        this.numOfSelectedFiles++;
      }
    });
    this.selectionChanged.emit(this.selectedFiles);
  }

  removeFile(fileIndex: number): void {
    if (fileIndex >= 0) {
      this.selectedFiles.splice(fileIndex, 1);
      this.numOfSelectedFiles--;
      this.selectionChanged.emit(this.selectedFiles);
    }
  }

  selectedFileOnClick(file: File): void {
    this.imageViewer.openModal(file);
  }

  public clearFileSelection(): void {
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.splice(0, this.selectedFiles.length);
      this.selectionChanged.emit(this.selectedFiles);
    }
  }

  onPictureTaken(pictureFile: File) {
    this.selectedFiles.push(pictureFile);
    this.selectionChanged.emit(this.selectedFiles);
  }

}
