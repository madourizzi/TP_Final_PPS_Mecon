import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerEncuestasPage } from './ver-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: VerEncuestasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerEncuestasPage]
})
export class VerEncuestasPageModule {}
