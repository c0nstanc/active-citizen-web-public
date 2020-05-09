import { NgModule } from '@angular/core';
import { AuthRoute } from './auth.routing';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    AuthRoute
  ],
  exports:[]
})
export class AuthModule { }
