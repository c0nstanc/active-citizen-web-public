import { NgModule, SkipSelf, Optional } from '@angular/core';
import { ActiveCitizenRoute } from './active-citizen.routing';
import { EnsureModuleLoadedOnceInLayoutModuleGuard } from '../core/guard/ensure-module-loaded-once-in-layout-module.guard';

@NgModule({
  declarations: [],
  imports: [
    ActiveCitizenRoute,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class ActiveCitizenModule extends EnsureModuleLoadedOnceInLayoutModuleGuard {
  constructor(@Optional() @SkipSelf() targetModule: ActiveCitizenModule) {
    super(targetModule);
  }
}
