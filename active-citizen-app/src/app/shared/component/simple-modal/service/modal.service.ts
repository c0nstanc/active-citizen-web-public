import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ModalConfig } from '../model/modal-config.model';
import { ModalSize } from '../model/modal-size.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private sideNavIsOpened = false;

  public sideNavToggled: BehaviorSubject<boolean> = new BehaviorSubject(this.sideNavIsOpened);

  private modalHost: ViewContainerRef;

  private globalConfig: ModalConfig = {
    // size: ModalSize.MEDIUM,
    modalClass: '',
    hideCloseButton: false,
    hideFooterArea: false,
    verticallyCentered: false,
    backdrop: true,
    isStaticBackdrop: true,
    animation: true,
    listenToKeyboard: true,
    closeOnOutsideClick: true,
    backdropClass: 'modal-backdrop'
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  getDefaults(): ModalConfig {
    return this.globalConfig;
  }

  setDefaults(config: ModalConfig) {
    this.globalConfig = Object.assign(this.globalConfig, config);
  }

  setRootViewContainerRef(ref) {
    this.modalHost = ref;
  }

  open(modalInstance, settings?: ModalConfig) {
    const config = settings || {};
    if (typeof modalInstance === 'object') {
      modalInstance.init(config);
      modalInstance.open();
      return modalInstance;
    } else if (typeof modalInstance === 'function') {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalInstance);
      this.modalHost.remove();
      const componentRef = this.modalHost.createComponent(componentFactory);
      componentRef.instance['SimpleModalComponent'].init(config);
      componentRef.instance['close'] = this.closeFactory();
      componentRef.instance['onClose'] = componentRef.instance['SimpleModalComponent'].onClose;
      componentRef.instance['onOpen'] = componentRef.instance['SimpleModalComponent'].onOpen;
      setTimeout(() => componentRef.instance['SimpleModalComponent'].open());
      return componentRef.instance;
    }
  }

  close(modalInstance) {
    modalInstance.close();
  }

  closeFactory() {
    var _self = this;
    return function () {
      this['SimpleModalComponent'].close();
      _self.modalHost.remove();
    }
  }

  public setSideNavIsOpen(isOpen: boolean): void {
    this.sideNavToggled.next(isOpen);
    this.sideNavIsOpened = isOpen;
  }

  public getSideNavIsOpen(): boolean {
    return this.sideNavIsOpened;
  }

}
