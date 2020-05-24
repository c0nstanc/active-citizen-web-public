
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleTranslateLoader, IModuleTranslationOptions } from '@larscom/ngx-translate-module-loader';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { EnsureModuleLoadedOnceGuard } from './guard/ensure-module-loaded-once.guard';


// AoT requires an exported function for factories
export function ModuleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      { baseTranslateUrl },
      { moduleName: 'wizard', baseTranslateUrl },
      { moduleName: 'login', baseTranslateUrl },
      { moduleName: 'enter-incident-details', baseTranslateUrl },
      { moduleName: 'authentication', baseTranslateUrl }


    ],
    nameSpaceUppercase: false,
  };
  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    LoggerModule.forRoot({
      serverLoggingUrl: environment.serverLoggingUrl,
      serverLogLevel: environment.serverLogLevel,
      level: environment.logLevel,
      disableConsoleLogging: environment.disableConsoleLogging
    }),
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage.code,
      loader: {
        provide: TranslateLoader,
        useFactory: ModuleHttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    // CommonModule
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
