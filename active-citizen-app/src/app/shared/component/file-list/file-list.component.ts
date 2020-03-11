import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  @Input()
  selectedFiles: File[];

  @Output()
  fileRemoved: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  fileSelected: EventEmitter<File> = new EventEmitter<File>();

  visible = true;
  selectable = true;
  removable = true;

  constructor() { }

  ngOnInit(): void {
  }

  removeFile(fileIndex: number): void {
    this.fileRemoved.emit(fileIndex);
  }

  selectedFileOnClick(file: File): void {
    this.fileSelected.emit(file);
  }

}
