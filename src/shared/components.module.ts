import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { GameIconComponent } from './gameicon.component';
import { StatComponent } from './stat.component';
import { ItemComponent } from './item.component';

@NgModule({
  declarations: [
    GameIconComponent,
    StatComponent,
    ItemComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    GameIconComponent,
    StatComponent,
    ItemComponent
  ]
})
export class ComponentsModule {}
