import { OrdersModule } from './orders/orders.module';
import { OrderComponent } from './orders/order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ZXingScannerModule } from "@zxing/ngx-scanner";

@NgModule({
  declarations: [
    DashboardComponent,
    ToolsComponent,
    ScannerComponent,
  ],
  imports: [
    CommonModule,
    ZXingScannerModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    OrdersModule,
    PipesModule
  ]
})
export class AdminModule { }
