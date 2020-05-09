import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserActivityComponent } from './component/user-activity/user-activity.component';
import { UserSettingsComponent } from './component/user-settings/user-settings.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: UserProfileComponent,

  },
  {
    path: 'activity',
    component: UserActivityComponent
  },
  {
    path: 'settings',
    component: UserSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionTabsRoutingModule { }
