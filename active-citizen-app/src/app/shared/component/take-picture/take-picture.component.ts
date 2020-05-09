import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CamInitError } from '../camera/model/cam-init-error.model';
import { Subject, Observable } from 'rxjs';
import { CamUtil } from '../camera/util/cam.util';
import { ModalService } from '../simple-modal/service/modal.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.scss']
})
export class TakePictureComponent implements OnInit, OnDestroy {


  @Output()
  pictureTaken = new EventEmitter<File>();

  // toggle webcam on/off
  public showCam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: CamInitError[] = [];

  // latest snapshot
  public imageFile: File = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextCam: Subject<boolean | string> = new Subject<boolean | string>();

  @ViewChild('simpleModal') simpleModal: ElementRef;

  private simpleModalRef: ElementRef;

  constructor(private modalService: ModalService) { }

  public ngOnInit(): void {
    CamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleCam(): void {
    this.showCam = !this.showCam;
    this.closeModal();
  }

  public handleInitError(error: CamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextCam.next(directionOrDeviceId);
  }

  public onImageCaptured(imageFile: File): void {
    this.pictureTaken.emit(imageFile);
    this.imageFile = imageFile;
    this.closeModal();
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextCam.asObservable();
  }

  onTakePicture(): void {
    this.openModal();
  }

  openModal(): void {
    this.startCam();
    this.simpleModalRef = this.modalService.open(this.simpleModal, {
      modalClass: 'photo-modal',
      hideCloseButton: false,
      hideFooterArea: false,
      verticallyCentered: true,
      backdrop: true,
      isStaticBackdrop: false,
      animation: true,
      listenToKeyboard: false,
      closeOnOutsideClick: true,
      backdropClass: 'modal-backdrop'
    });
  }

  onCloseModal() {
    this.closeModal();
  }

  closeModal() {
    this.closeCam();
    this.modalService.close(this.simpleModalRef);
    // or this.modalRef.close();
  }

  startCam(): void {
    this.showCam = true;
  }

  closeCam(): void {
    this.showCam = false;
  }

  ngOnDestroy(): void {
    this.closeCam();
  }

}
