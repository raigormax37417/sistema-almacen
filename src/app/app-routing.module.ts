import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(e => e.AuthModule)},
  {path: 'students', loadChildren: () => import('./students/students.module').then(e => e.StudentsModule)},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
