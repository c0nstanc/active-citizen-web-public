export interface ModalConfig {
  title?: string;
  size?: string | 'md';
  modalClass?: string | '';
  hideCloseButton?: boolean | false;
  hideFooterArea?: boolean | false;
  cancelButtonLabel?: string | '';
  verticallyCentered?: boolean | false;
  backdrop?: boolean | true;
  isStaticBackdrop?: boolean | 'static' | true;
  animation?: boolean | true;
  listenToKeyboard?: boolean | true;
  closeOnOutsideClick?: boolean | true;
  backdropClass?: string | 'modal-backdrop';
}
