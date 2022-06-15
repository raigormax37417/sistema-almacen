import { OrdersModule } from './orders/orders.module';
import { OrderComponent } from './orders/order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { AdminPipe } from '../pipes/admin.pipe';
import { ScannerComponent } from './scanner/scanner.component';
import { ZXingScannerModule } from "@zxing/ngx-scanner";

@NgModule({
  declarations: [
    DashboardComponent,
    ToolsComponent,
    AdminPipe,
    ScannerComponent,
  ],
  imports: [
    CommonModule,
    ZXingScannerModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    OrdersModule
  ],
})
export class AdminModule { }
