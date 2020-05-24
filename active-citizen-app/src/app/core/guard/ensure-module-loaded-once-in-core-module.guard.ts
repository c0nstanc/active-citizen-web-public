import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';

export class EnsureModuleLoadedOnceInCoreModuleGuard extends EnsureModuleLoadedOnceGuard {

  constructor(targetModule: any) {
    super(targetModule, 'CoreModule');
  }
}
