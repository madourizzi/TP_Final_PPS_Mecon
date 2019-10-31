import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListadoEsperaPage } from './listado-espera.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoEsperaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListadoEsperaPage]
})
export class ListadoEsperaPageModule {}
