export class CamImage {

  public constructor(imageAsDataUrl: string, mimeType: string, imageData: ImageData) {
    this._mimeType = mimeType;
    this._imageAsDataUrl = imageAsDataUrl;
    this._imageData = imageData;
  }

  private readonly _mimeType: string = null;
  private _imageAsBase64: string = null;
  private readonly _imageAsDataUrl: string = null;
  private readonly _imageData: ImageData = null;

  /**
   * Extracts the Base64 data out of the given dataUrl.
   * @param dataUrl the given dataUrl
   * @param mimeType the mimeType of the data
   */
  private static getDataFromDataUrl(dataUrl: string, mimeType: string) {
    return dataUrl.replace(`data:${mimeType};base64,`, '');
  }

  /**
   * Get the base64 encoded image data
   * @returns base64 data of the image
   */
  public get imageAsBase64(): string {
    return this._imageAsBase64 ? this._imageAsBase64
      : this._imageAsBase64 = CamImage.getDataFromDataUrl(this._imageAsDataUrl, this._mimeType);
  }

  /**
   * Get the encoded image as dataUrl
   * @returns the dataUrl of the image
   */
  public get imageAsDataUrl(): string {
    return this._imageAsDataUrl;
  }

  /**
   * Get the ImageData object associated with the canvas' 2d context.
   * @returns the ImageData of the canvas's 2d context.
   */
  public get imageData(): ImageData {
    return this._imageData;
  }

  public camImageToFile(): File {
    const imageName = 'CAPTURE_' + new Date().valueOf() + '.' + this._mimeType.replace('image/', '');
    const imageBlob = this.dataURItoBlob(this.imageAsBase64);
    return new File([imageBlob], imageName, { type: this._mimeType });
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: 'this._mimeType' });
  }

}
