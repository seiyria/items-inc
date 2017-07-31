import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { ComponentsModule } from '../../shared/components.module';

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    ComponentsModule
  ],
})
export class MainPageModule {}
