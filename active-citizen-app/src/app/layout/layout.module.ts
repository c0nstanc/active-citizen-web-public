import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutRoute } from './layout.routing';
import { ActiveCitizenLayoutPageComponent } from './active-citizens-layout-page/active-citizens-layout-page.component';
import { AuthLayoutPageComponent } from './auth-layout-page/auth-layout-page.component';
import { AcHeaderComponent } from './active-citizens-layout-page/component/ac-header/ac-header.component';
import { AcContentComponent } from './active-citizens-layout-page/component/ac-content/ac-content.component';
import { AcFooterComponent } from './active-citizens-layout-page/component/ac-footer/ac-footer.component';
import { AcSidenavComponent } from './active-citizens-layout-page/component/ac-sidenav/ac-sidenav.component';

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
export class LayoutModule { }
