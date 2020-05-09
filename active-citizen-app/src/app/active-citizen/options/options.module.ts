import { NgModule } from '@angular/core';
import { UserOptionsComponent } from './page/user-options/user-options.component';
import { OptionsRoute } from './options.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [UserOptionsComponent],
  imports: [
    SharedModule,
    OptionsRoute
  ]
})
export class OptionsModule { }
