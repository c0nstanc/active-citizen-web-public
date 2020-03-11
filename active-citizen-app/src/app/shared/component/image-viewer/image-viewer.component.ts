import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalService } from '../simple-modal/service/modal.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {


  displayedImage: File = null;
  displayedImageUrl: any;


  @ViewChild('imageViewerModal') imageViewerModal: ElementRef;

  private modalRef: ElementRef;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  public openModal(file: File): void {
    this.loadPhoto(file);
    this.modalRef = this.modalService.open(this.imageViewerModal, {
      modalClass: 'image-viewer-modal',
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
    // or this.modalRef.close();
  }

  private loadPhoto(file: File): void {

    if (file.type.match(/image\/*/) != null) {
      this.displayedImage = file;
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.displayedImage);
      reader.onload = (event: ProgressEvent) => {
        if (event.loaded) {
          this.displayedImageUrl = reader.result;
        }
      };
    }

  }

}
