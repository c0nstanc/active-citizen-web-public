import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(
    private router: Router
  ) {
  }

  public getCurrentFullUrl(): string {
    const baseUrl = this.getBaseUrl();
    return baseUrl.substring(0, baseUrl.length - 1) + this.router.url;
  }

  public getBaseUrl(): string {
    return document.getElementsByTagName('base')[0].href;
  }

  public startListening(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      pairwise()).subscribe((e) => {
        this.previousUrl = (e[0] as NavigationEnd).urlAfterRedirects;
        this.currentUrl = (e[1] as NavigationEnd).urlAfterRedirects;
      });
  }

  getPreviousUrl(): string {
    return this.previousUrl;
  }

  getCurrentUrl(): string {
    return this.currentUrl;
  }

  getPreviousBaseUrl(): string {
    if (typeof this.getPreviousUrl() === 'undefined' || (-1 === this.getPreviousUrl().indexOf('?'))) {
      return this.getPreviousUrl();
    } else {
      return this.getPreviousUrl().split('?', 1)[0];
    }
  }

  getCurrentBaseUrl(): string {
    if (typeof this.getCurrentUrl() === 'undefined' || (-1 === this.getCurrentUrl().indexOf('?'))) {
      return this.getCurrentUrl();
    } else {
      return this.getCurrentUrl().split('?', 1)[0];
    }
  }
}
