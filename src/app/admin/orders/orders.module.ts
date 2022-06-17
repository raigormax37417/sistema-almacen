import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PipesModule
  ]
})
export class OrdersModule { }
