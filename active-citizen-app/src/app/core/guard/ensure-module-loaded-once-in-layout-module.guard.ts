import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';

export class EnsureModuleLoadedOnceInLayoutModuleGuard extends EnsureModuleLoadedOnceGuard {

  constructor(targetModule: any) {
    super(targetModule, 'LayoutModule');
  }
}
