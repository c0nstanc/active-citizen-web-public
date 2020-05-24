import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceInCoreModuleGuard } from '../core/guard/ensure-module-loaded-once-in-core-module.guard';
import { MockHttpIncidentService } from './service/mock-http-incident.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MockHttpIncidentService
  ]
})
export class MockModule extends EnsureModuleLoadedOnceInCoreModuleGuard {
  constructor(@Optional() @SkipSelf() targetModule: MockModule) {
    super(targetModule);
  }
}
