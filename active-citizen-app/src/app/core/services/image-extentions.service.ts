import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageExtentionsService {

  public readonly JPG = 'jpg,jpeg,jpe,jif,jfif,jfi';
  public readonly PNG = 'png';
  public readonly GIF = 'gif';
  public readonly WEBP = 'webp';
  public readonly TIFF = 'tiff,tif';
  public readonly PSD = 'psd';
  public readonly RAW = 'raw,arw,cr2,nrw,k25';
  public readonly BMP = 'bmp,dib';
  public readonly HEIF = 'heif,heic';
  public readonly INDD = 'ind,indd,indt';
  public readonly JPEG_2000 = 'jp2,j2k,jpf,jpx,jpm,mj2';
  public readonly SVG = 'svg,svgz';
  public readonly AI = 'ai';
  public readonly EPS = 'eps';
  public readonly PDF = 'pdf';

  private imageExtentions: string[] = [];

  constructor() {
    this.imageExtentions = [
      this.JPG,
      this.PNG,
      this.GIF,
      this.WEBP,
      this.TIFF,
      this.PSD,
      this.RAW,
      this.BMP,
      this.HEIF,
      this.INDD,
      this.JPEG_2000,
      this.SVG,
      this.AI,
      this.EPS,
      this.PDF
    ];
  }

  public getImageExtentionsAsString(): string {

    let imageExtentions = '';
    this.imageExtentions.forEach((extention: string) => {
      imageExtentions += ',' + extention;
    });

    return imageExtentions;
  }

  public getImageExtentions(): string[] {

    const imageExtentions = [];
    this.imageExtentions.forEach((extention: string) => {
      imageExtentions.push(...extention.split(','));
    });

    return imageExtentions;
  }
}
