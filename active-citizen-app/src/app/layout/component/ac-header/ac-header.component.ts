import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { HeaderNavItem } from './model/header-nav-item.model';
import { NavItem } from 'src/app/shared/model/nav/nav-item.model';
import { ModalService } from 'src/app/shared/component/simple-modal/service/modal.service';
import { SubSink } from 'subsink';
import { OptionGroup } from 'src/app/shared/component/menu/model/option-group.model';
import { NavLink } from 'src/app/core/common/model/nav-link.model';

@Component({
  selector: 'app-ac-header',
  templateUrl: './ac-header.component.html',
  styleUrls: ['./ac-header.component.scss']
})
export class AcHeaderComponent implements OnInit, OnDestroy {


  @Output()
  hamburgerToggle: EventEmitter<void> = new EventEmitter();

  optionGroups: OptionGroup[] = [];

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
    this.initializeOptionGroups();
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

  private getOptionGroup1(): OptionGroup {
    return new OptionGroup([
      new NavLink('Profile and Visibility', '/options/profile'),
      new NavLink('Activity', '/options/activity'),
      new NavLink('Settings', '/options/settings')
    ]);
  }

  private getOptionGroup2(): OptionGroup {
    return new OptionGroup([
      new NavLink('Report an Issue', ''),
      new NavLink('Change Language...', ''),
      new NavLink('Help', '')
    ]);
  }

  private getOptionGroup3(): OptionGroup {
    return new OptionGroup([
      new NavLink('Log Out', '')
    ]);
  }

  private initializeOptionGroups() {
    this.optionGroups = [...this.optionGroups, this.getOptionGroup1()]
    this.optionGroups = [...this.optionGroups, this.getOptionGroup2()]
    this.optionGroups = [...this.optionGroups, this.getOptionGroup3()]
  }

}
