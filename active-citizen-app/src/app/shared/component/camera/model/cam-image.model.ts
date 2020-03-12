export class CamImage {

  private readonly mimeType: string = null;
  private imageAsBase64: string = null;
  private readonly imageAsDataUrl: string = null;
  private readonly imageData: ImageData = null;

  public constructor(
    imageAsDataUrl: string,
    mimeType: string,
    imageData: ImageData) {
    this.mimeType = mimeType;
    this.imageAsDataUrl = imageAsDataUrl;
    this.imageData = imageData;
  }

  /**
   * Extracts the Base64 data out of the given dataUrl.
   * @param dataUrl the given dataUrl
   * @param mimeType the mimeType of the data
   */
  private static getDataFromDataUrl(dataUrl: string, mimeType: string) {
    return dataUrl.replace(`data:${mimeType};base64,`, '');
  }

  /**
   * Get the encoded image as dataUrl
   * @returns the dataUrl of the image
   */
  private getImageAsDataUrl(): string {
    return this.imageAsDataUrl;
  }

  /**
   * Get the base64 encoded image data
   * @returns base64 data of the image
   */
  private getImageAsBase64(): string {
    return this.imageAsBase64 ? this.imageAsBase64
      : this.imageAsBase64 = CamImage.getDataFromDataUrl(this.getImageAsDataUrl(), this.mimeType);
  }

  /**
   * Get the ImageData object associated with the canvas' 2d context.
   * @returns the ImageData of the canvas's 2d context.
   */
  public getImageData(): ImageData {
    return this.imageData;
  }

  public camImageToFile(): File {
    const imageName = 'CAPTURE_' + new Date().valueOf() + '.' + this.mimeType.replace('image/', '');
    const imageBlob = this.getDataURItoBlob(this.getImageAsBase64());
    return new File([imageBlob], imageName, { type: this.mimeType });
  }

  private getDataURItoBlob(dataURI: string): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: this.mimeType });
  }

}
