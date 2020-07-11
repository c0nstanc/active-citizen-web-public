import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ModalService } from 'src/app/shared/component/simple-modal/service/modal.service';
import { SubSink } from 'subsink';
import { OptionGroup } from 'src/app/shared/component/menu/model/option-group.model';
import { NavLink } from 'src/app/core/common/model/nav/nav-link.model';
import { LinksGroup } from 'src/app/core/common/model/nav/links-group.model';
import { NavItem } from 'src/app/core/common/model/nav/nav-item.model';

@Component({
  selector: 'app-ac-header',
  templateUrl: './ac-header.component.html',
  styleUrls: ['./ac-header.component.scss']
})
export class AcHeaderComponent implements OnInit, OnDestroy {


  @Output()
  hamburgerToggle: EventEmitter<void> = new EventEmitter();

  linksGroup: LinksGroup[] = [];

  isLightTheme: boolean;
  isDarkTheme: boolean;

  private subs = new SubSink();


  navItems: NavItem[] = [
    new NavItem('My Incidents', '/incidents/'),
    new NavItem('Register Item', '/incidents/'),
    new NavItem('Contact', '/contact'),
    new NavItem('About', '/about')
  ];

  constructor(
    private themeService: ThemeService, private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.initThemeSelection();
    this.initializeLinksGroups();
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

  private getLinksGroup1(): OptionGroup {
    return new LinksGroup([
      new NavLink('Profile and Visibility', '/options/profile'),
      new NavLink('Activity', '/options/activity'),
      new NavLink('Settings', '/options/settings')
    ]);
  }

  private getLinksGroup2(): OptionGroup {
    return new LinksGroup([
      new NavLink('Report an Issue', ''),
      new NavLink('Change Language...', ''),
      new NavLink('Help', '')
    ]);
  }

  private getLinksGroup3(): OptionGroup {
    return new LinksGroup([
      new NavLink('Log Out', '')
    ]);
  }

  private initializeLinksGroups(): void {
    this.linksGroup = [...this.linksGroup, this.getLinksGroup1()];
    this.linksGroup = [...this.linksGroup, this.getLinksGroup2()];
    this.linksGroup = [...this.linksGroup, this.getLinksGroup3()];
  }

}
