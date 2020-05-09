import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptionTabsRoutingModule } from './option-tabs.routing';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserActivityComponent } from './component/user-activity/user-activity.component';
import { UserSettingsComponent } from './component/user-settings/user-settings.component';



@NgModule({
  declarations: [UserProfileComponent, UserActivityComponent, UserSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    OptionTabsRoutingModule
  ]
})
export class OptionTabsModule { }
