import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminPage } from './admin.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ImageComponent } from 'src/app/components/image/image.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
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
  declarations: [AdminPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ImageComponent]

})
export class AdminPageModule {}
