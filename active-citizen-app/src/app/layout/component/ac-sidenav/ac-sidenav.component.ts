import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavMenuItem } from './model/sidenav-menu-item.model';
import { MatSidenav } from '@angular/material/sidenav';
import { NavItem } from 'src/app/core/model/nav/nav-item.model';

const DESKTOP_WIDTH_BREAKPOINT = '64em';

@Component({
  selector: 'app-ac-sidenav',
  templateUrl: './ac-sidenav.component.html',
  styleUrls: ['./ac-sidenav.component.scss']
})
export class AcSidenavComponent implements OnInit {

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

  @ViewChild('sidenav', { static: false })
  sidenav: MatSidenav;


  constructor() { }

  ngOnInit(): void {
    this.sidenavOpen = false;
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

}
