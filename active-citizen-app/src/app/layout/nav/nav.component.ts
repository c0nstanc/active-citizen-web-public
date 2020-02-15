import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public version = environment.version;
  public repoUrl = 'https://www.google.com';
  public isDarkTheme$: Observable<boolean>;

  navItems = [
    { link: '/dashboard/home', title: 'Home' },
    { link: '/dashboard/home', title: 'Register Item' },
    { link: '/contact', title: 'Contact' },
    { link: '/about', title: 'About' }
  ];

  constructor(
    // private themeService: ThemeService
  ) { }

  ngOnInit() {
    // this.isDarkTheme$ = this.themeService.getDarkTheme();
  }

  // toggleTheme(checked: boolean) {
  //   this.themeService.setDarkTheme(checked);
  // }
}
