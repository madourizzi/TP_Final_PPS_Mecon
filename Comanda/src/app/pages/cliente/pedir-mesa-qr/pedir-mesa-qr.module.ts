import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedirMesaQrPage } from './pedir-mesa-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PedirMesaQrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedirMesaQrPage]
})
export class PedirMesaQrPageModule {}
