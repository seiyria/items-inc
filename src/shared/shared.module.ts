import { NgModule } from '@angular/core';

import { GameStateService } from './gamestate.service';
import { GameIconComponent } from './gameicon.component';

@NgModule({
  declarations: [
    GameIconComponent
  ],
  exports: [
    GameIconComponent
  ],
  providers: [
    GameStateService
  ]
})
export class SharedModule {}
