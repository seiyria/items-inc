import { NgModule } from '@angular/core';

import { GameStateService } from './gamestate.service';

@NgModule()
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [GameStateService]
    };
  }
}
