import { ConfirmComponent } from './confirm/confirm.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: 'login', component: LogInComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'confirm', component: ConfirmComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
