import { ProfileComponent } from './profile/profile.component';
import { CompleteSignUpGuard } from './guards/complete-sign-up.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(e => e.AuthModule)},
  {path: 'students', loadChildren: () => import('./students/students.module').then(e => e.StudentsModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(e => e.AdminModule)},
  {path: 'profile', component:ProfileComponent},
  {path: 'qrcomponents', loadChildren: () => import('./qrcomponents/qrcomponents.module').then(e => e.QrcomponentsModule) },
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
