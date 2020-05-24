import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';

export class EnsureModuleLoadedOnceInAppModuleGuard extends EnsureModuleLoadedOnceGuard {

  constructor(targetModule: any) {
    super(targetModule, 'AppModule');
  }
}
