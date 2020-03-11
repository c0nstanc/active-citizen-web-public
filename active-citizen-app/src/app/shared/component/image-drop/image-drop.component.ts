import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image-drop',
  templateUrl: './image-drop.component.html',
  styleUrls: ['./image-drop.component.scss']
})
export class ImageDropComponent implements OnInit {


  @Input()
  supportedFileTypesCategoty = 'Images';

  @Input()
  maxFileSize = 4194304;

  @Output()
  selectionChanged: EventEmitter<File[]> = new EventEmitter<File[]>();

  allowedExtensions = 'jpg'; // TODO - Add more extensions

  dragging: boolean;

  constructor() { }

  ngOnInit(): void {
    this.dragging = false;
  }

  onDragging(dragging: boolean): void {
    this.dragging = dragging;
  }

  onSelectionChanged(files: File[]): void {
    this.selectionChanged.emit(files);
  }

}
