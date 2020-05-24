import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutRoute } from './layout.routing';
import { ActiveCitizenLayoutPageComponent } from './component/active-citizens-layout-page/active-citizens-layout-page.component';
import { AuthLayoutPageComponent } from './component/auth-layout-page/auth-layout-page.component';
import { AcHeaderComponent } from './component/ac-header/ac-header.component';
import { AcContentComponent } from './component/ac-content/ac-content.component';
import { AcFooterComponent } from './component/ac-footer/ac-footer.component';
import { AcSidenavComponent } from './component/ac-sidenav/ac-sidenav.component';
import { EnsureModuleLoadedOnceInAppModuleGuard } from '../core/guard/ensure-module-loaded-once-in-app-module.guard';

@NgModule({
  declarations: [
    ActiveCitizenLayoutPageComponent,
    AuthLayoutPageComponent,
    AcHeaderComponent,
    AcContentComponent,
    AcFooterComponent,
    AcSidenavComponent],
  imports: [
    SharedModule,
    LayoutRoute
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class LayoutModule extends EnsureModuleLoadedOnceInAppModuleGuard {
  constructor(@Optional() @SkipSelf() targetModule: LayoutModule) {
    super(targetModule);
  }
}
