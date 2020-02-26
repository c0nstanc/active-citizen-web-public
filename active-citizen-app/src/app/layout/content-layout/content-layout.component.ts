import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '../../core/services/theme.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, OnDestroy {
  private overlayContainer: OverlayContainer;
  public theme = 'my-light-theme';

  sidenavHeight = '2.5rem';


  mobileQuery: MediaQueryList;


  private mobileQueryListener: () => void;

  constructor(
    private themeService: ThemeService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
