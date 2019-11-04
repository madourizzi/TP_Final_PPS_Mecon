import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OcuparMesaPage } from './ocupar-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: OcuparMesaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OcuparMesaPage]
})
export class OcuparMesaPageModule {}
