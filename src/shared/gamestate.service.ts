
import * as _ from 'lodash';
import * as packageJson from '../../package.json';

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { GameState } from './classes/gamestate';

const GAMESTATE_KEY = 'gamestate';

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

  private createGameFromState(state?: GameState) {
    this.state = new GameState(state);
    this.state.version = (<any>packageJson).version;
  }

  initGame() {
    this.createGameFromState();
    this.state.gold = 500;
  }

  loadGame(state: GameState) {
    this.createGameFromState(state);
  }

  saveGame() {
    this.localStorage.store(GAMESTATE_KEY, this.state);
  }

  generateFreeTinkerItem() {

  }
}
