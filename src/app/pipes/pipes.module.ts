import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPipe } from './admin.pipe';


@NgModule({
  declarations: [
    AdminPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminPipe
  ]
})
export class PipesModule { }
