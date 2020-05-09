import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOptionsComponent } from './pages/user-options/user-options.component';
import {     OptionsRoutingModule} from './options.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [UserOptionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    OptionsRoutingModule
  ]
})
export class OptionsModule { }
