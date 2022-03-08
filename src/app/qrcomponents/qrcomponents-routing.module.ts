import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrGenerateComponent } from './qr-generate/qr-generate.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'qr-generate', component: QrGenerateComponent },
      { path: '**', redirectTo: 'dataqr' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrcomponentsRoutingModule { }
