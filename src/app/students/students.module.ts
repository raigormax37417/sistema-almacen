import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { MaterialComponent } from './material/material.component';
import { ToolsPipe } from '../pipes/tools.pipe';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    MaterialComponent,
    ToolsPipe,
    QrcodeComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    QRCodeModule
  ]
})
export class StudentsModule { }
