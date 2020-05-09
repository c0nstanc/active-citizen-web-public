import { Component, OnInit } from '@angular/core';
import { NavLink } from 'src/app/core/common/model/nav-link.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) { }

  optionsGroup1: NavLink[] = []
  optionsGroup2: NavLink[] = []
  optionsGroup3: NavLink[] = []

  username = 'User'; // TODO - From User

  ngOnInit(): void {
    this.optionsGroup1 = this.getOptionGroup1();
    this.optionsGroup2 = this.getOptionGroup2();
    this.optionsGroup3 = this.getOptionGroup3();

  }

  optionClicked(option: NavLink): void {
    this.router.navigate([option.path]);
  }

  private getOptionGroup1(): NavLink[] {
    return [
      new NavLink('Profile and Visibility', '/options/profile'),
      new NavLink('Activity', '/options/activity'),
      new NavLink('Settings', '/options/settings')
    ];
  }

  private getOptionGroup2(): NavLink[] {
    return [
      new NavLink('Report an Issue', ''),
      new NavLink('Change Language...', ''),
      new NavLink('Help', '')
    ];
  }

  private getOptionGroup3(): NavLink[] {
    return [
      new NavLink('Log Out', '')
    ];
  }

}
