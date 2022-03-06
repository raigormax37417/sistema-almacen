import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmComponent } from './confirm/confirm.component';



@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
})
export class AuthModule { }
