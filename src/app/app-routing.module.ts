import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataqrSendComponent } from './components/dataqr-send/dataqr-send.component';
import { QrGenerateComponent } from './components/qr-generate/qr-generate.component';

const routes: Routes = [
  {path: 'qr-generate', component: QrGenerateComponent},
  {path: 'data-send', component: DataqrSendComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
