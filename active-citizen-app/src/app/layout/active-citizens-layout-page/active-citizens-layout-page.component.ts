import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-active-citizens-layout-page',
  templateUrl: './active-citizens-layout-page.component.html',
  styleUrls: ['./active-citizens-layout-page.component.scss']
})
export class ActiveCitizenLayoutPageComponent implements OnInit {


  overlayContainer: OverlayContainer;

  theme = 'my-light-theme';


  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
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

}
