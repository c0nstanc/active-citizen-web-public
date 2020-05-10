import { NavItem } from 'src/app/shared/model/nav/nav-item.model';

export class SidenavMenuItem implements NavItem {


  constructor(public title: string, public link?: string, public children?: NavItem[]) {
  }

}

