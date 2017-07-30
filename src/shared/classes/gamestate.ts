
import * as _ from 'lodash';
import { Item } from './item';
import { ItemGenerator } from './itemgenerator';

export class GameState {
  private gold: number;
  private version: string;

  private tinkerItems: Item[] = [];

  constructor(opts?) {
    _.extend(this, opts);
    this.loadItems();
    this.migrateValues();
  }

  changeVersion(newVersion) {
    this.version = newVersion;
  }

  // gold related functions
  get currentGold() {
    return this.gold;
  }

  gainGold(gold: number = 0) {
    this.gold += gold;
    if(this.gold <= 0) this.gold = 0;
  }

  // tinker related functions
  get tinkerTiers() {
    return [
      { name: 'Free', cost: 0 }
    ];
  }

  get tinkerLimit() {
    return 1;
  }

  get canTinker() {
    return this.tinkerItems.length < this.tinkerLimit;
  }

  generateTinkerItem(tier = 0) {
    if(!this.canTinker) return;

    const tierInfo = this.tinkerTiers[tier];
    if(!tierInfo || tierInfo.cost > this.gold) return;

    if(tier === 0) this.addTinkerItem(ItemGenerator.generateFreeItem());
  }

  addTinkerItem(item: Item) {
    this.tinkerItems.push(item);
  }

  salvageTinkerItem(item: Item) {
    const itemVerify = _.find(this.tinkerItems, item);
    if(!itemVerify) return;

    this.gainGold(itemVerify.currentScore);
    this.tinkerItems = _.without(this.tinkerItems, itemVerify);
  }

  // serialization-related functions
  loadItems() {
    this.tinkerItems = _.map(this.tinkerItems, i => new Item(i));
  }

  migrateValues() {
    if(this.gold <= 0) this.gold = 0;
  }

  toJSON() {
    return _.omitBy(this, (val, key) => {
      const descriptor = Object.getOwnPropertyDescriptor(this, key);
      return (!descriptor || !descriptor.writable);
    });
  }
}
