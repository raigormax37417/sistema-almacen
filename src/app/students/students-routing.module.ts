import { CompleteSignUpGuard } from './../guards/complete-sign-up.guard';
import { AuthGuard } from './../guards/auth.guard';
import { MaterialComponent } from './material/material.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { UserOrderComponent } from './material/user-order/user-order.component';

const routes: Routes = [{
  path:'',
  canActivate:[AuthGuard],
  canActivateChild:[CompleteSignUpGuard],
  children:[
    {path: 'material', component: MaterialComponent},
    {path: 'qrcode', component: QrcodeComponent},
    {path: 'material/user-order', component: UserOrderComponent},
    {path: '**', redirectTo:'material', pathMatch: 'full'},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
