import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ModalService } from './service/modal.service';
import { ModalConfig } from './model/modal-config.model';
import { ModalSize } from './model/modal-size.enum';

declare var document: any;

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  size: ModalSize;
  @Input()
  modalClass: string;
  @Input()
  hideCloseButton: boolean;
  @Input()
  verticallyCentered: boolean;
  @Input()
  backdrop: boolean;
  @Input()
  isStaticBackdrop: boolean;
  @Input()
  animation: boolean;
  @Input()
  listenToKeyboard: boolean;
  @Input()
  closeOnOutsideClick: boolean;
  @Input()
  backdropClass: string;

  @Output()
  public opened = new EventEmitter<string>();
  @Output()
  public closed = new EventEmitter<string>();


  @ViewChild('modalRoot')
  public modalRoot: ElementRef;

  public isOpened = false;
  private inputSettings: ModalConfig;
  public settings: ModalConfig;
  private backdropElement: HTMLElement;
  public sideNavIsOpen: boolean;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.sideNavIsOpen = this.modalService.getSideNavIsOpen();
    this.modalService.sideNavToggled.subscribe((sideNavIsOpen: boolean) => {
      this.sideNavIsOpen = sideNavIsOpen;
    });
    this.inputSettings = {
      title: this.title,
      // size: this.size || ModalSize.MEDIUM,
      modalClass: this.modalClass || '',
      hideCloseButton: this.hideCloseButton || false,
      verticallyCentered: this.verticallyCentered || false,
      backdrop: this.backdrop || true,
      isStaticBackdrop: this.isStaticBackdrop || true,
      animation: this.animation || true,
      listenToKeyboard: this.listenToKeyboard || true,
      closeOnOutsideClick: this.closeOnOutsideClick || true,
      backdropClass: this.backdropClass || 'modal-backdrop'
    };
  }

  init(config: ModalConfig) {
    this.opened.observers = [];
    this.closed.observers = [];
    this.settings = Object.assign({}, this.modalService.getDefaults(), this.inputSettings, config);
    this.createBackDrop();
  }


  open() {
    if (this.isOpened) {
      return;
    }
    this.modalRoot.nativeElement.parentNode.appendChild(this.backdropElement);
    document.body.classList.add('modal-open');
    this.isOpened = true;
    window.setTimeout(() => {
      this.modalRoot.nativeElement.classList.add('show');
      this.modalRoot.nativeElement.focus();
      this.opened.emit('test');
    }, 100);
  }

  close() {
    if (!this.isOpened) {
      return;
    }

    this.modalRoot.nativeElement.classList.remove('show');
    this.modalRoot.nativeElement.parentNode.removeChild(this.backdropElement);
    document.body.className = document.body.className.replace(/modal-open\b/, '');
    window.setTimeout(() => {
      this.isOpened = false;
      this.closed.emit('test');
    }, 100);
  }

  public preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  private createBackDrop() {
    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add('fade');
    this.backdropElement.classList.add('show');
    if (this.settings && this.settings.backdrop && this.settings.backdrop === true) {
      this.backdropElement.classList.add(this.settings.backdropClass);
    }
  }
}
