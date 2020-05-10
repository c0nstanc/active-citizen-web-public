import { NgModule } from '@angular/core';
import { OptionsRoute } from './options.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserOptionsComponent } from './component/user-options/user-options.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserActivityComponent } from './component/user-activity/user-activity.component';
import { UserSettingsComponent } from './component/user-settings/user-settings.component';



@NgModule({
  declarations: [UserOptionsComponent,
    UserProfileComponent,
    UserActivityComponent,
    UserSettingsComponent],
  imports: [
    SharedModule,
    OptionsRoute
  ]
})
export class OptionsModule { }
