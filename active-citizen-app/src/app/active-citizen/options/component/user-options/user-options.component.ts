import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../../../core/model/nav/nav-link.model';

@Component({
  selector: 'ac-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit {


  navLinks: NavLink[] = [];


  constructor() { }

  ngOnInit(): void {
    this.navLinks = [
      new NavLink('Profile and Visibility', 'profile'),
      new NavLink('Activity', 'activity'),
      new NavLink('Settings', 'settings')];
  }

}
