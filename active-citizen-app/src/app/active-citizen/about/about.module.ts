import { NgModule } from '@angular/core';


import { AboutComponent } from './page/about/about.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutRoute } from './about-routing.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    SharedModule,
    AboutRoute
  ]
})
export class AboutModule { }
