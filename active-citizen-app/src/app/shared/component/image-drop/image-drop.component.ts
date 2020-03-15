import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageExtentionsService } from 'src/app/core/services/image-extentions.service';

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

  allowedExtensions: string;

  dragging: boolean;

  constructor(
    private imageExtentionsService: ImageExtentionsService
  ) { }

  ngOnInit(): void {
    this.allowedExtensions = this.imageExtentionsService.getImageExtentionsAsString();
    this.dragging = false;
  }

  onDragging(dragging: boolean): void {
    this.dragging = dragging;
  }

  onSelectionChanged(files: File[]): void {
    this.selectionChanged.emit(files);
  }

}
