import { Component, AfterViewInit, OnDestroy, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CamUtil } from './util/cam.util';
import { CamInitError } from './model/cam-init-error.model';
import { CamImage } from './model/cam-image.model';
import { CamMirrorProperties } from './model/cam-mirror-properties.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit, OnDestroy {

  private static DEFAULT_VIDEO_OPTIONS: MediaTrackConstraints = { facingMode: 'environment' };
  private static DEFAULT_IMAGE_TYPE = 'image/jpeg';
  private static DEFAULT_IMAGE_QUALITY = 0.92;

  @Input() public width = 640;
  @Input() public height = 480;
  @Input() public videoOptions: MediaTrackConstraints = CameraComponent.DEFAULT_VIDEO_OPTIONS;
  @Input() public allowCameraSwitch = true;
  @Input() public mirrorImage: string | CamMirrorProperties;
  @Input() public captureImageData = false;
  @Input() public imageType: string = CameraComponent.DEFAULT_IMAGE_TYPE;
  @Input() public imageQuality: number = CameraComponent.DEFAULT_IMAGE_QUALITY;

  @Output() public imageCapture: EventEmitter<File> = new EventEmitter<File>();
  @Output() public initError: EventEmitter<CamInitError> = new EventEmitter<CamInitError>();
  @Output() public imageClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public cameraSwitched: EventEmitter<string> = new EventEmitter<string>();

  public availableVideoInputs: MediaDeviceInfo[] = [];

  public videoInitialized = false;

  private subs = new SubSink();

  private activeVideoInputIndex = -1;
  private mediaStream: MediaStream = null;
  @ViewChild('video', { static: true })
  private video: any;
  @ViewChild('canvas', { static: true })
  private canvas: any;

  private activeVideoSettings: MediaTrackSettings = null;

  /**
   * If the given Observable emits, an image will be captured and emitted through 'imageCapture' EventEmitter
   */
  @Input()
  public set trigger(trigger: Observable<void>) {

    this.subs.unsubscribe();


    this.subs.sink = trigger.subscribe(() => {
      this.takeSnapshot();
    });
  }

  @Input()
  public set switchCamera(switchCamera: Observable<boolean | string>) {
    this.subs.unsubscribe();

    // Subscribe to events from this Observable to switch video device
    this.subs.sink = switchCamera.subscribe((value: boolean | string) => {
      if (typeof value === 'string') {
        this.switchToVideoInput(value);
      } else {
        this.rotateVideoInput(value !== false);
      }
    });
  }


  private static getMediaConstraintsForDevice(deviceId: string, baseMediaTrackConstraints: MediaTrackConstraints): MediaTrackConstraints {
    const result: MediaTrackConstraints = baseMediaTrackConstraints ? baseMediaTrackConstraints : this.DEFAULT_VIDEO_OPTIONS;
    if (deviceId) {
      result.deviceId = { exact: deviceId };
    }

    return result;
  }


  private static getDeviceIdFromMediaStreamTrack(mediaStreamTrack: MediaStreamTrack): string {
    if (mediaStreamTrack.getSettings && mediaStreamTrack.getSettings() && mediaStreamTrack.getSettings().deviceId) {
      return mediaStreamTrack.getSettings().deviceId;
    } else if (mediaStreamTrack.getConstraints && mediaStreamTrack.getConstraints() && mediaStreamTrack.getConstraints().deviceId) {
      const deviceIdObj: ConstrainDOMString = mediaStreamTrack.getConstraints().deviceId;
      return CameraComponent.getValueFromConstrainDOMString(deviceIdObj);
    }
  }


  private static getFacingModeFromMediaStreamTrack(mediaStreamTrack: MediaStreamTrack): string {
    if (mediaStreamTrack) {
      if (mediaStreamTrack.getSettings && mediaStreamTrack.getSettings() && mediaStreamTrack.getSettings().facingMode) {
        return mediaStreamTrack.getSettings().facingMode;
      } else if (mediaStreamTrack.getConstraints && mediaStreamTrack.getConstraints() && mediaStreamTrack.getConstraints().facingMode) {
        const facingModeConstraint: ConstrainDOMString = mediaStreamTrack.getConstraints().facingMode;
        return CameraComponent.getValueFromConstrainDOMString(facingModeConstraint);
      }
    }
  }

  private static isUserFacing(mediaStreamTrack: MediaStreamTrack): boolean {
    const facingMode: string = CameraComponent.getFacingModeFromMediaStreamTrack(mediaStreamTrack);
    return facingMode ? 'user' === facingMode.toLowerCase() : false;
  }


  private static getValueFromConstrainDOMString(constrainDOMString: ConstrainDOMString): string {
    if (constrainDOMString) {
      if (constrainDOMString instanceof String) {
        return String(constrainDOMString);
      } else if (Array.isArray(constrainDOMString) && Array(constrainDOMString).length > 0) {
        return String(constrainDOMString[0]);
      } else if (typeof constrainDOMString === 'object') {
        if ((constrainDOMString as ConstrainDOMStringParameters).exact) {
          return String((constrainDOMString as ConstrainDOMStringParameters).exact);
        } else if ((constrainDOMString as ConstrainDOMStringParameters).ideal) {
          return String((constrainDOMString as ConstrainDOMStringParameters).ideal);
        }
      }
    }

    return null;
  }

  public ngAfterViewInit(): void {
    this.detectAvailableDevices()
      .then(() => {
        // start video
        this.switchToVideoInput(null);
      })
      .catch((err: string) => {
        this.initError.next({ message: err } as CamInitError);
        // fallback: still try to load camera, even if device enumeration failed
        this.switchToVideoInput(null);
      });
  }

  public ngOnDestroy(): void {
    this.stopMediaTracks();
    this.unsubscribeFromSubscriptions();
  }


  public takeSnapshot(): void {
    const video = this.nativeVideoElement;
    const dimensions = { width: this.width, height: this.height };
    if (video.videoWidth) {
      dimensions.width = video.videoWidth;
      dimensions.height = video.videoHeight;
    }

    const canvas = this.canvas.nativeElement;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // paint snapshot image to canvas
    const context2d = canvas.getContext('2d');
    context2d.drawImage(video, 0, 0);

    // read canvas content as image
    const mimeType: string = this.imageType ? this.imageType : CameraComponent.DEFAULT_IMAGE_TYPE;
    const quality: number = this.imageQuality ? this.imageQuality : CameraComponent.DEFAULT_IMAGE_QUALITY;
    const dataUrl: string = canvas.toDataURL(mimeType, quality);

    // get the ImageData object from the canvas' context.
    let imageData: ImageData = null;

    if (this.captureImageData) {
      imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
    }

    this.imageCapture.next(new CamImage(dataUrl, mimeType, imageData).camImageToFile());
  }

  public rotateVideoInput(forward: boolean) {
    if (this.availableVideoInputs && this.availableVideoInputs.length > 1) {
      const increment: number = forward ? 1 : (this.availableVideoInputs.length - 1);
      const nextInputIndex = (this.activeVideoInputIndex + increment) % this.availableVideoInputs.length;
      this.switchToVideoInput(this.availableVideoInputs[nextInputIndex].deviceId);
    }
  }


  public switchToVideoInput(deviceId: string): void {
    this.videoInitialized = false;
    this.stopMediaTracks();
    this.initCam(deviceId, this.videoOptions);
  }



  public videoResize(): void {
    // here to trigger Angular change detection
  }

  public get videoWidth() {
    const videoRatio = this.getVideoAspectRatio();
    return Math.min(this.width, this.height * videoRatio);
  }

  public get videoHeight() {
    const videoRatio = this.getVideoAspectRatio();
    return Math.min(this.height, this.width / videoRatio);
  }

  public get videoStyleClasses() {
    let classes = '';

    if (this.isMirrorImage()) {
      classes += 'mirrored ';
    }

    return classes.trim();
  }

  public get nativeVideoElement() {
    return this.video.nativeElement;
  }


  private getVideoAspectRatio(): number {
    // calculate ratio from video element dimensions if present
    const videoElement = this.nativeVideoElement;
    if (videoElement.videoWidth && videoElement.videoWidth > 0 &&
      videoElement.videoHeight && videoElement.videoHeight > 0) {

      return videoElement.videoWidth / videoElement.videoHeight;
    }

    // nothing present - calculate ratio based on width/height params
    return this.width / this.height;
  }


  private initCam(deviceId: string, userVideoTrackConstraints: MediaTrackConstraints) {
    const video = this.nativeVideoElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      // merge deviceId -> userVideoTrackConstraints
      const videoTrackConstraints = CameraComponent.getMediaConstraintsForDevice(deviceId, userVideoTrackConstraints);

      navigator.mediaDevices.getUserMedia({ video: videoTrackConstraints } as MediaStreamConstraints)
        .then((stream: MediaStream) => {
          this.mediaStream = stream;
          video.srcObject = stream;
          video.play();

          this.activeVideoSettings = stream.getVideoTracks()[0].getSettings();
          const activeDeviceId: string = CameraComponent.getDeviceIdFromMediaStreamTrack(stream.getVideoTracks()[0]);

          this.cameraSwitched.next(activeDeviceId);

          // Initial detect may run before user gave permissions, returning no deviceIds. This prevents later camera switches. (#47)
          // Run detect once again within getUserMedia callback, to make sure this time we have permissions and get deviceIds.
          this.detectAvailableDevices()
            .then(() => {
              this.activeVideoInputIndex = activeDeviceId ? this.availableVideoInputs
                .findIndex((mediaDeviceInfo: MediaDeviceInfo) => mediaDeviceInfo.deviceId === activeDeviceId) : -1;
              this.videoInitialized = true;
            })
            .catch(() => {
              this.activeVideoInputIndex = -1;
              this.videoInitialized = true;
            });
        })
        .catch((err: MediaStreamError) => {
          this.initError.next({ message: err.message, mediaStreamError: err } as CamInitError);
        });
    } else {
      this.initError.next({ message: 'Cannot read UserMedia from MediaDevices.' } as CamInitError);
    }
  }

  private getActiveVideoTrack(): MediaStreamTrack {
    return this.mediaStream ? this.mediaStream.getVideoTracks()[0] : null;
  }

  private isMirrorImage(): boolean {
    if (!this.getActiveVideoTrack()) {
      return false;
    }

    // check for explicit mirror override parameter
    {
      let mirror = 'auto';
      if (this.mirrorImage) {
        if (typeof this.mirrorImage === 'string') {
          mirror = String(this.mirrorImage).toLowerCase();
        } else {
          // CamMirrorProperties
          if (this.mirrorImage.x) {
            mirror = this.mirrorImage.x.toLowerCase();
          }
        }
      }

      switch (mirror) {
        case 'always':
          return true;
        case 'never':
          return false;
      }
    }

    // default: enable mirroring if camera is user facing
    return CameraComponent.isUserFacing(this.getActiveVideoTrack());
  }

  /**
   * Stops all active media tracks.
   * This prevents the camera from being indicated as active,
   * even if it is no longer used by this component.
   */
  private stopMediaTracks() {
    if (this.mediaStream && this.mediaStream.getTracks) {
      // getTracks() returns all media tracks (video+audio)
      this.mediaStream.getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
    }
  }


  private unsubscribeFromSubscriptions() {
    this.subs.unsubscribe();
  }


  private detectAvailableDevices(): Promise<MediaDeviceInfo[]> {
    return new Promise((resolve, reject) => {
      CamUtil.getAvailableVideoInputs()
        .then((devices: MediaDeviceInfo[]) => {
          this.availableVideoInputs = devices;
          resolve(devices);
        })
        .catch(err => {
          this.availableVideoInputs = [];
          reject(err);
        });
    });
  }

}
