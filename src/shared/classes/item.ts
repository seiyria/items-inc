
import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

type ItemClass =
  'basic' | 'pro' | 'idle' | 'godly' | 'goatly';

type ItemType =
  'mainhand' | 'offhand'
| 'body' | 'charm' | 'feet' | 'finger' | 'hands' | 'head' | 'legs' | 'neck';

export class Item {

  id: string;
  createdAt: number;
  baseScore: number;
  currentScore: number;

  baseName: string;
  type: ItemType;

  str = 0;
  dex = 0;
  con = 0;
  agi = 0;
  int = 0;
  luk = 0;
  enchantLevel = 0;

  xp: number;
  hp: number;
  mp: number;
  hpregen: number;
  mpregen: number;
  crit: number;
  prone: number;
  venom: number;
  poison: number;
  shatter: number;
  vampire: number;
  gold: number;
  sentimentality: number;
  dance: number;
  offense: number;
  defense: number;
  deadeye: number;
  lethal: number;
  silver: number;
  power: number;
  vorpal: number;
  aegis: number;
  glowing: number;
  salvage: number;


  static defaults = {
    str: 0,
    dex: 0,
    con: 0,
    agi: 0,
    int: 0,
    luk: 0,
    enchantLevel: 0
  };

  static multipliers = {
    str: 1.5,
    dex: 1,
    agi: 1,
    con: 2.5,
    int: 2,
    luk: 5,
    enchantLevel: 125,
    xp: 60,
    hp: 0.5,
    mp: 0.2,
    hpregen: 4,
    mpregen: 2,
    crit: 100,
    prone: 400,
    venom: 500,
    poison: 350,
    shatter: 300,
    vampire: 700,
    gold: 0.5,
    sentimentality: 1,
    dance: 100,
    defense: 100,
    offense: 100,
    deadeye: 100,
    lethal: 200,
    silver: 100,
    power: 100,
    vorpal: 500,
    aegis: 100,
    glowing: 300,
    salvage: 2000
  };

  constructor(opts?) {
    this.id = uuid();
    this.createdAt = Date.now();

    _.extend(this, Item.defaults, opts);

    const myScore = this.score;

    if(!this.baseScore) {
      this.baseScore = myScore;
    }

    this.currentScore = myScore;

    if(this.baseScore <= 0) this.baseScore = 1;
    if(this.currentScore <= 0) this.currentScore = 1;
  }

  get itemClass(): ItemClass {
    if(this.baseName.toLowerCase() !== this.baseName)     return 'pro';
    if(_.includes(this.baseName.toLowerCase(), 'idle')
    || _.includes(this.baseName.toLowerCase(), 'idling')) return 'idle';
    if(this.score >= 15000)                               return 'godly';

    return 'basic';
  }

  get name() {
    if(this.enchantLevel > 0) return `+${this.enchantLevel} ${this.baseName}`;
    return `${this.baseName}`;
  }

  get score() {
    let ret = 0;
    _.each(Item.multipliers, (mult, attr) => {
      if(!this[attr]) return;
      ret += this[attr] * mult;
    });
    ret = ~~ret;
    return ret;
  }

  toJSON() {
    return _.omitBy(this, (val, key) => {
      const descriptor = Object.getOwnPropertyDescriptor(this, key);
      return (!descriptor || !descriptor.writable);
    });
  }

}
