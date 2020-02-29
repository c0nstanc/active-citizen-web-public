import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../model/nav/nav-item.model';



@Component({
  selector: 'app-sidenav-menu-item',
  templateUrl: './sidenav-menu-item.component.html',
  styleUrls: ['./sidenav-menu-item.component.scss']
})
export class SidenavMenuItemComponent implements OnInit {

  @Input()
  navItem: NavItem;

  ngOnInit(): void {

  }
  constructor() { }

}
