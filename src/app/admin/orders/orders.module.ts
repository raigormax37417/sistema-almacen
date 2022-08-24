import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PipesModule
  ],
  exports:[OrderComponent, OrdersComponent],
})
export class OrdersModule { }
