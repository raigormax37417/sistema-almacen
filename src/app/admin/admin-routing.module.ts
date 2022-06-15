import { ScannerComponent } from './scanner/scanner.component';
import { AdminGuard } from './../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsComponent } from './tools/tools.component';

const routes: Routes = [
  {
    path: '',
    canActivate:[AdminGuard],
    children:[
      {path: 'dashboard', component: DashboardComponent },
      {path: 'tools', component: ToolsComponent},
      {path: 'scanner', component: ScannerComponent},
      // {path: 'orders', loadChildren: ()=>import('./orders/orders.module').then(e => e.OrdersModule)},
      {path:'**', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
