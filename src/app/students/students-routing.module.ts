import { AuthGuard } from './../guards/auth.guard';
import { MaterialComponent } from './material/material.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  children:[
    {path: 'material', component: MaterialComponent},
    {path: '', redirectTo:'material', 
    pathMatch: 'full', 
  },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
