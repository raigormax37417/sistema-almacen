import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmComponent } from './confirm/confirm.component';



@NgModule({
  declarations: [
    SignInComponent,
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
