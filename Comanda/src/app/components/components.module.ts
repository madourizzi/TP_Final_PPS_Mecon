import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ImageComponent
  ],
  exports: [
    HeaderComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
