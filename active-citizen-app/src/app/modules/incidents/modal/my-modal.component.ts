import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/component/simple-modal/service/modal.service';
import { ModalSize } from 'src/app/shared/component/simple-modal/model/modal-size.enum';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss']
})
export class MyModalComponent implements OnInit {

  // @Input() id;

  // constructor(
  //   public activeModal: NgbActiveModal
  // ) { }

  // ngOnInit(): void {
  //     console.log(this.id);
  // }
  @ViewChild('myModal') myModal;
  private modalRef;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalRef = this.modalService.open(this.myModal, {
    //  size: ModalSize.MEDIUM,
      modalClass: 'mymodal',
      hideCloseButton: false,
      verticallyCentered: false,
      backdrop: true,
      isStaticBackdrop: true,
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
}
