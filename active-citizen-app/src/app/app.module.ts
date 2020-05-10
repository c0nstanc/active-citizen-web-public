import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoute } from './app-routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Core & Shared
    CoreModule,

    // app main routing
    AppRoute,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
