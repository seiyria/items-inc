
import * as _ from 'lodash';

import { Item } from './item';

import * as body from '../../assets/items/body.json';
import * as charm from '../../assets/items/charm.json';
import * as feet from '../../assets/items/feet.json';
import * as finger from '../../assets/items/finger.json';
import * as hands from '../../assets/items/hands.json';
import * as head from '../../assets/items/head.json';
import * as legs from '../../assets/items/legs.json';
import * as mainhand from '../../assets/items/mainhand.json';
import * as neck from '../../assets/items/neck.json';
import * as offhand from '../../assets/items/offhand.json';
import * as prefix from '../../assets/items/prefix.json';
import * as prefixSpecial from '../../assets/items/prefix-special.json';
import * as suffix from '../../assets/items/suffix.json';

const ItemTypes = [
  'body', 'charm', 'feet', 'finger', 'hands', 'head',
  'legs', 'mainhand', 'neck', 'offhand'
];

const AllAssets = {
  body:           (<any>body).data,
  charm:          (<any>charm).data,
  feet:           (<any>feet).data,
  finger:         (<any>finger).data,
  hands:          (<any>hands).data,
  head:           (<any>head).data,
  legs:           (<any>legs).data,
  mainhand:       (<any>mainhand).data,
  neck:           (<any>neck).data,
  offhand:        (<any>offhand).data,
  prefix:         (<any>prefix).data,
  prefixSpecial:  (<any>prefixSpecial).data,
  suffix:         (<any>suffix).data
};

export class ItemGenerator {

  static generateFreeItem() {
    const itemNames = {
      body:     ['Tattered Shirt', 'Spray Tan', 'Temporary Tattoos', 'Hero\'s Tunic', 'Grandma\'s Sweater'],
      feet:     ['Cardboard Shoes', 'Wheelie Shoes', 'Sandals With Built-in Socks'],
      finger:   ['Twisted Wire', 'Candy Ring', 'Hero Academy Graduation Ring'],
      hands:    ['Pixelated Gloves', 'Winter Gloves', 'Mittens'],
      head:     ['Miniature Top Hat', 'Fruit Hat', 'Beanie', 'Sunglasses'],
      legs:     ['Leaf', 'Cargo Shorts', 'Comfy Shorts'],
      neck:     ['Old Brooch', 'Candy Necklace', 'Keyboard Cat Tie'],
      mainhand: ['Empty and Broken Ale Bottle', 'Father\'s Sword', 'Butter Knife', 'Hero\'s Axe', 'Chocolate Drumstick', 'Aged Toothbrush'],
      offhand:  ['Chunk of Rust', 'Shaking Fist', 'Upside-down Map', 'Sticker Book', 'Stolen Dagger'],
      charm:    ['Ancient Bracelet', 'Family Photo', 'Third Place Bowling Trophy', 'Love Letter']
    };

    const r = () => _.random(-2, 7);

    const itemType = _.sample(ItemTypes);
    const itemName = _.sample(itemNames[itemType]).toLowerCase();

    const item = new Item({
      baseName: itemName,
      type: itemType,
      str: r(), con: r(), dex: r(), int: r(), agi: r(), luk: r()
    });

    return item;
  }

  static generateItem({ type, bonus, scoreCap }): Item {
    if(!type) type = _.sample(ItemTypes);
    const item = this.generateItemInRange({ type, bonus, scoreCap });
    return item;
  }

  private static generateItemInRange({ type, bonus, scoreCap }): Item {
    let item = new Item();
    let score = item.score;

    while(score < scoreCap / 10 || score > scoreCap) {
      const baseItem = _.sample(AllAssets[type]);
      baseItem.baseName = baseItem.name;
      delete baseItem.name;
      item = new Item(baseItem);
      score = item.score;
      this.addPropertiesToItem(item, bonus * 10);
    }

    return item;
  }

  static addPropertiesToItem(item, bonus = 0) {

    let prefixBonus = 0;
    if(bonus >= 10) prefixBonus++;
    if(bonus >= 20) prefixBonus++;

    if(_.random(0, 3) - prefixBonus <= 0) {
      this.mergePropInto(item, _.sample(AllAssets.prefix), 'prefix');

      let iter = 1;
      const seti = () => _.random(0, Math.pow(15, iter));
      let i = seti();
      while(i < 1 + bonus) {
        this.mergePropInto(item, _.sample(AllAssets.prefix), 'prefix');
        iter++;
        i = seti();
      }
    }

    if(_.random(0, 100) - (prefixBonus * 5) <= 0) {
      this.mergePropInto(item, _.sample(AllAssets.prefixSpecial), 'prefix');
    }

    if(_.random(0, 85) <= 1 + bonus) {
      this.mergePropInto(item, _.sample(AllAssets.suffix), 'suffix');
    }
  }

  static mergePropInto(baseItem, prop, propType) {
    if(!prop) return;

    prop.baseName = prop.name;

    if(propType === 'suffix') {
      baseItem.baseName = `${baseItem.baseName} of the ${prop.baseName}`;
    } else {
      baseItem.baseName = `${prop.baseName} ${baseItem.baseName}`;
    }

    _.each(prop, (val, attr) => {
      if(!_.isNumber(val) || _.isEmpty(attr)) return;

      if(baseItem[attr]) {
        if (_.includes(attr, 'Req')) {
          baseItem[attr] = Math.max(baseItem[attr], prop[attr]);
        } else {
          baseItem[attr] += prop[attr];
        }
      } else {
        baseItem[attr] = _.isNaN(prop[attr]) ? true : prop[attr];
      }

    });

    baseItem.baseName = _.trim(baseItem.baseName);
  }
}
