
import * as _ from 'lodash';
import * as packageJson from '../../package.json';

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

const GAMESTATE_KEY = 'gamestate';

class GameState {
  gold: number;
  version: string;

  constructor(opts?) {
    _.extend(this, opts);
    this.migrateValues();
  }

  migrateValues() {
    if(this.gold <= 0) this.gold = 0;
    if(!this.version) this.version = (<any>packageJson).version;
  }
}

@Injectable()
export class GameStateService {

  private state: GameState;

  public get data() {
    return _.cloneDeep(this.state);
  }

  constructor(private localStorage: LocalStorageService) {
    this.initIfNecessary();
  }

  initIfNecessary() {
    const state = this.localStorage.retrieve(GAMESTATE_KEY);
    if(!state) {
      this.initGame();
      this.saveGame();
    } else {
      this.loadGame(state);
    }
  }

  initGame() {
    this.state = new GameState();
    this.state.gold = 500;
  }

  loadGame(state: GameState) {
    this.state = new GameState(state);
  }

  saveGame() {
    this.localStorage.store(GAMESTATE_KEY, this.state);
    console.log(this.state);
  }
}
