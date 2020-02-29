import { NavItem } from 'src/app/shared/model/nav/nav-item.model';

export class HeaderNavItem implements NavItem {

  constructor(public title: string, public link: string) {
  }
}
