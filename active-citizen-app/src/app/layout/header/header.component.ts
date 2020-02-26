import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isLightTheme: boolean;
  public isDarkTheme: boolean;

  public isLightThemeSub: Subscription;


  navItems = [
    { link: '/incidents/my-incidents', title: 'My Incidents' },
    { link: '/incidents/my-incidents', title: 'Register Item' },
    { link: '/contact', title: 'Contact' },
    { link: '/about', title: 'About' }
  ];

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.initThemeSelection();
    this.isLightThemeSub = this.themeService.getLightTheme().subscribe((isLightTheme: boolean) => {
      this.isLightTheme = isLightTheme;
      this.isDarkTheme = !this.isLightTheme;
    }

    );
  }

  toggleTheme(checked: boolean) {
    this.themeService.setLightTheme(!checked);
  }

  private initThemeSelection(): void {
    this.isLightTheme = true;
    this.isDarkTheme = !this.isLightTheme;
  }

  ngOnDestroy() {

    if (this.isLightThemeSub) {
      this.isLightThemeSub.unsubscribe();
    }
  }

}
