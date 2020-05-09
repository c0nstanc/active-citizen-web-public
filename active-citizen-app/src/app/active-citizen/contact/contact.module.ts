import { NgModule } from '@angular/core';

import { ContactRoutes } from './contact-routing.module';
import { ContactComponent } from './page/contact/contact.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    ContactRoutes,

    SharedModule
  ]
})
export class ContactModule { }
