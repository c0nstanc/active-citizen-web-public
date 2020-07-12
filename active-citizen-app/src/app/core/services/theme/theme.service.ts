import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme: BehaviorSubject<boolean>;
  private isLightTheme: BehaviorSubject<boolean>;


  constructor() {
    this.isDarkTheme = new BehaviorSubject<boolean>(
      localStorage.getItem('isDarkTheme') === 'true'
    );

    this.isLightTheme = new BehaviorSubject<boolean>(
      localStorage.getItem('isLightTheme') === 'true'
    );
    this.setLightTheme(true);
  }

  setDarkTheme(isDarkTheme: boolean) {
    this.isDarkTheme.next(isDarkTheme);
    localStorage.setItem('isDarkTheme', this.isDarkTheme.value.toString());
  }

  getDarkTheme(): Observable<boolean> {
    return this.isDarkTheme;
  }

  setLightTheme(isLightTheme: boolean) {
    this.isLightTheme.next(isLightTheme);
    localStorage.setItem('isLightTheme', this.isLightTheme.value.toString());
  }

  getLightTheme(): Observable<boolean> {
    return this.isLightTheme;
  }
}
