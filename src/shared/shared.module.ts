import { NgModule } from '@angular/core';

import { GameStateService } from './gamestate.service';
import { GameIconComponent } from './gameicon.component';
import { ItemComponent } from './item.component';

@NgModule({
  declarations: [
    GameIconComponent,
    ItemComponent
  ],
  exports: [
    GameIconComponent,
    ItemComponent
  ],
  providers: [
    GameStateService
  ]
})
export class SharedModule {}
