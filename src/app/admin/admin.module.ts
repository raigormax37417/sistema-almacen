import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { AdminPipe } from '../pipes/admin.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    ToolsComponent,
    AdminPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
