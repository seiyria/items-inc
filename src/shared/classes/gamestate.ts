
import * as _ from 'lodash';
import { Item } from './item';
import { ItemGenerator } from './itemgenerator';

class Upgrade {
  name: string;
  tier: number;
  cost: number;
  desc: string;
}

export class GameState {
  private gold: number;
  private version: string;

  private tinkerItems: Item[] = [];

  private upgrades = {};

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

  hasGold(gold: number) {
    return this.gold > gold;
  }

  // upgrade related functions
  hasUpgrade(upg) {
    return this.upgrades[upg] > 0;
  }

  // tinker related functions
  get tinkerTiers() {
    return [
      { name: 'Free',       cost: 0,         maxScore: -1 },
      { name: 'Basic',      cost: 300,       maxScore: 500 },
      { name: 'Minor',      cost: 1000,      maxScore: 2000 },
      { name: 'Lesser',     cost: 2500,      maxScore: 4000 },
      { name: 'Common',     cost: 15000,     maxScore: 7000 },
      { name: 'Advanced',   cost: 50000,     maxScore: 10000 },
      { name: 'Major',      cost: 125000,    maxScore: 30000 },
      { name: 'Greater',    cost: 500000,    maxScore: 50000 },
      { name: 'Rare',       cost: 1000000,   maxScore: 100000 }
    ];
  }

  get tinkerUpgrades(): Upgrade[] {
    return [
      // { name: 'Item Storage', cost: 500 },
      { name: 'Item Shop',         cost: 1000, tier: 1, desc: 'Activate the Item Shop and begin selling your items.' },
      { name: 'More Tinker Space', cost: 1000, tier: 1, desc: 'Get +1 Tinker Item Slots.' },
      { name: 'More Tinker Space', cost: 2000, tier: 2, desc: 'Get +1 Tinker Item Slots.' }
    ];
  }

  get buyableTinkerUpgrades(): Upgrade[] {
    return _.filter(this.tinkerUpgrades, upg => {
      return this.hasGold(upg.cost) && (upg.tier - 1 === (this.upgrades[upg.name] || 0));
    });
  }

  get tinkerLimit(): number {
    return 3 + this.getUpgradeValue('More Tinker Space');
  }

  get canTinker() {
    return this.tinkerItems.length < this.tinkerLimit;
  }

  generateTinkerItem(tier = 0) {
    if(!this.canTinker) return;

    const tierInfo = this.tinkerTiers[tier];
    if(!tierInfo || !this.hasGold(tierInfo.cost)) return;

    if(tier === 0) {
      this.addTinkerItem(ItemGenerator.generateFreeItem());
    } else {
      this.addTinkerItem(ItemGenerator.generateItem({ type: '', bonus: tier, scoreCap: tierInfo.maxScore }));
    }

    this.gainGold(-tierInfo.cost);
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

  tinkerUpgrade(upgrade) {
    const upgradeVerify = _.find(this.tinkerUpgrades, upgrade);
    if(!upgradeVerify) return;

    if(this.upgrades[upgradeVerify.name] >= upgradeVerify.tier) return;

    if(!this.hasGold(upgradeVerify.cost)) return;

    this.gainUpgrade(upgradeVerify);
    this.gainGold(-upgradeVerify.cost);
  }

  // upgrade-related functions
  gainUpgrade(upgradeInfo: Upgrade) {
    this.upgrades[upgradeInfo.name] = upgradeInfo.tier;
  }

  getUpgradeValue(upgradeName: string): number {
    return this.upgrades[upgradeName] || 0;
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
