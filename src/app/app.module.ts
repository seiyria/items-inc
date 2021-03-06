import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ModuleModule } from '../shared/module.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../shared/components.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ModuleModule,
    SharedModule.forRoot(),
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
