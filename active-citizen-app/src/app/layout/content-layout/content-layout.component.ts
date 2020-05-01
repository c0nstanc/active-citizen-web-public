import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '../../core/services/theme.service';
import { NavItem } from 'src/app/shared/model/nav/nav-item.model';
import { SidenavMenuItem } from './model/sidenav-menu-item.model';


const DESKTOP_WIDTH_BREAKPOINT = '64em';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, OnDestroy {

  overlayContainer: OverlayContainer;
  theme = 'my-light-theme';
  sidenavHeight = '2.5rem';

  sidenavOpen: boolean;

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${DESKTOP_WIDTH_BREAKPOINT})`);

  navItems: NavItem[] = [
    new SidenavMenuItem('My Incidents', '/incidents/', [
      new SidenavMenuItem('About', '/about'),
      new SidenavMenuItem('About', '/about'),
      new SidenavMenuItem('About', '/about')]),
    new SidenavMenuItem('Register Item', '/incidents/'),
    new SidenavMenuItem('Contact', '/contact'),
    new SidenavMenuItem('About', '/about')
  ];



  constructor(
    private themeService: ThemeService) {
    // zone.run(() => this.mediaMatcher.addEventListener('change', this.mediaMatcher.onchange));
  }

  ngOnInit(): void {
    this.sidenavOpen = false;
    if (this.overlayContainer) {
      this.overlayContainer.getContainerElement().classList.add(this.theme);
    }

    this.themeService.getDarkTheme().subscribe(theme => {
      this.theme = (theme) ? 'my-dark-theme' : 'my-light-theme';

      if (this.overlayContainer) {
        const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
        if (themeClassesToRemove.length) {
          overlayContainerClasses.remove(...themeClassesToRemove);
        }
        overlayContainerClasses.add(this.theme);
      }
    });

    this.themeService.getLightTheme().subscribe(theme => {
      this.theme = (theme) ? 'my-light-theme' : 'my-dark-theme';

      if (this.overlayContainer) {
        const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
        if (themeClassesToRemove.length) {
          overlayContainerClasses.remove(...themeClassesToRemove);
        }
        overlayContainerClasses.add(this.theme);
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }


  ngOnDestroy(): void {
    // this.mediaMatcher.removeEventListener('change', this.mediaMatcher.onchange);
  }
}
