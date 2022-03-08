import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrcomponentsRoutingModule } from './qrcomponents-routing.module';
import { QrGenerateComponent } from './qr-generate/qr-generate.component';


@NgModule({
  declarations: [
    QrGenerateComponent
  ],
  imports: [
    CommonModule,
    QrcomponentsRoutingModule
  ]
})
export class QrcomponentsModule { }
