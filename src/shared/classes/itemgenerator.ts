
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
  body, charm, feet, finger, hands, head,
  legs, mainhand, neck, offhand,
  prefix, prefixSpecial, suffix
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

  static generateItem({ type, bonus }): Item {

    if(!type) type = _.sample(ItemTypes);

    const baseItem = _.sample(AllAssets[type]);

    const item = new Item(baseItem);
    return item;
  }
}
