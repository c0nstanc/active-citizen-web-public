import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThemeService } from 'src/app/core/services/theme.service';

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
    { link: '/incidents/my-incidents', title: 'My Incidents' },
    { link: '/incidents/my-incidents', title: 'Register Item' },
    { link: '/contact', title: 'Contact' },
    { link: '/about', title: 'About' }
  ];

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.isDarkTheme$ = this.themeService.getDarkTheme();
  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
