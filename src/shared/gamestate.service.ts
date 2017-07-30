
import * as packageJson from '../../package.json';

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { GameState } from './classes/gamestate';
import { Item } from './classes/item';

const GAMESTATE_KEY = 'gamestate';

@Injectable()
export class GameStateService {

  private state: GameState;

  public get data() {
    return this.state;
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
    this.state.changeVersion((<any>packageJson).version);
  }

  initGame() {
    this.createGameFromState();
    this.state.gainGold(500);
  }

  loadGame(state: GameState) {
    this.createGameFromState(state);
  }

  saveGame() {
    this.localStorage.store(GAMESTATE_KEY, this.state);
  }

  // tinker functions
  generateTinkerItem(tier = 0) {
    this.data.generateTinkerItem(tier);
    this.saveGame();
  }

  salvageTinkerItem(item: Item) {
    this.data.salvageTinkerItem(item);
    this.saveGame();
  }
}
