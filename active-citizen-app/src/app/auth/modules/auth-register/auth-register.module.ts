import { NgModule } from '@angular/core';
import { RegisterComponent } from '../../component/register/register.component';
import { AuthRegisterRoute } from './auth-register-routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    AuthRegisterRoute
  ]
})
export class AuthRegisterModule { }
