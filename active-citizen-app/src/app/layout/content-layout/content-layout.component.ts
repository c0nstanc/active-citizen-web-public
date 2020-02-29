import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '../../core/services/theme.service';
import { NavItem } from 'src/app/shared/model/nav/nav-item.model';
import { SidenavNavItem } from './model/sidenav-nav-item.model';


const TABLET_WIDTH_BREAKPOINT = '35em';

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

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${TABLET_WIDTH_BREAKPOINT})`);

  navItems: NavItem[] = [
    new SidenavNavItem('My Incidents', '/incidents/my-incidents', [
      new SidenavNavItem('About', '/about'),
      new SidenavNavItem('About', '/about'),
      new SidenavNavItem('About', '/about')]),
    new SidenavNavItem('Register Item', '/incidents/my-incidents'),
    new SidenavNavItem('Contact', '/contact'),
    new SidenavNavItem('About', '/about')
  ];



  constructor(
    private themeService: ThemeService) {
    // zone.run(() => this.mediaMatcher.addEventListener('change', this.mediaMatcher.onchange));
  }

  ngOnInit(): void {
    this.sidenavOpen = true;
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
