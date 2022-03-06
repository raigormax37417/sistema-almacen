import { ConfirmComponent } from './confirm/confirm.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: 'login', component: LogInComponent },
      { path: 'signup', component: SignUpComponent },
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
