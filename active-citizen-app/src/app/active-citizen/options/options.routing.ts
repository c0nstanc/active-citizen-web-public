import { Routes, RouterModule } from '@angular/router';
import { UserOptionsComponent } from './component/user-options/user-options.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserActivityComponent } from './component/user-activity/user-activity.component';
import { UserSettingsComponent } from './component/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: '',
    component: UserOptionsComponent,
    children: [
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
    ]

  },

];

export const OptionsRoute = RouterModule.forChild(routes);
