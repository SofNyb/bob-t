import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideshowPageRoutingModule } from './slideshow-routing.module';

import { SlideshowPage } from './slideshow.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideshowPageRoutingModule
  ],
  declarations: [SlideshowPage]
})
export class SlideshowPageModule {}
