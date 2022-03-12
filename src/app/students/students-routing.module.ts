import { AuthGuard } from './../guards/auth.guard';
import { MaterialComponent } from './material/material.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcodeComponent } from './qrcode/qrcode.component';

const routes: Routes = [{
  path:'',
  canActivate:[AuthGuard],
  children:[
    {path: 'material', component: MaterialComponent},
    {path: 'qrcode', component: QrcodeComponent},
    {path: '**', redirectTo:'material', pathMatch: 'full'},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
