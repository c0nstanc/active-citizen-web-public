import { NavItem } from 'src/app/shared/model/nav/nav-item.model';

export class SidenavNavItem implements NavItem {


  constructor(public title: string, public link?: string, public children?: NavItem[]) {
  }


}
