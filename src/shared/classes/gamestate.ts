
import * as _ from 'lodash';

export class GameState {
  gold: number;
  version: string;

  constructor(opts?) {
    _.extend(this, opts);
    this.migrateValues();
  }

  migrateValues() {
    if(this.gold <= 0) this.gold = 0;
  }
}
