export class EnsureModuleLoadedOnceGuard {

  constructor(targetModule: any, whereShouldBeLoaded:string) {
    if (targetModule) {
      throw new Error(`${targetModule.constructor.name} has already been loaded. Import this module in the ${whereShouldBeLoaded} only.`);
    }
  }
}
