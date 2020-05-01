import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { HeaderNavItem } from './model/header-nav-item.model';
import { NavItem } from 'src/app/shared/model/nav/nav-item.model';
import { ModalService } from 'src/app/shared/component/simple-modal/service/modal.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  @Output()
  hamburgerToggle: EventEmitter<void> = new EventEmitter();

  isLightTheme: boolean;
  isDarkTheme: boolean;

  private subs = new SubSink();


  navItems: NavItem[] = [
    new HeaderNavItem('My Incidents', '/incidents/'),
    new HeaderNavItem('Register Item', '/incidents/'),
    new HeaderNavItem('Contact', '/contact'),
    new HeaderNavItem('About', '/about')
  ];

  constructor(
    private themeService: ThemeService, private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.initThemeSelection();
    this.subs.sink = this.themeService.getLightTheme().subscribe((isLightTheme: boolean) => {
      this.isLightTheme = isLightTheme;
      this.isDarkTheme = !this.isLightTheme;
    }

    );
  }

  toggleTheme(checked: boolean): void {
    this.themeService.setLightTheme(!checked);
  }

  private initThemeSelection(): void {
    this.isLightTheme = true;
    this.isDarkTheme = !this.isLightTheme;
  }

  onHamburgerToggled(): void {
    this.modalService.setSideNavIsOpen(!this.modalService.getSideNavIsOpen());
    this.hamburgerToggle.emit();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
