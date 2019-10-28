import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ImageComponent } from 'src/app/components/image/image.component';

const routes: Routes = [
  {
    path: '',
    component: ListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ListPage],
  entryComponents: [ImageComponent]
})
export class ListPageModule {}
