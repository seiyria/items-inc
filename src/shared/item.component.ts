import { Component, Input } from '@angular/core';
import { Item } from './classes/item';

@Component({
  selector: 'item',
  template: `
<i class="itemicons itemicons-{{ size }} itemicons-{{ name }}"></i>
`
})
export class ItemComponent {
  @Input() public item: Item;
}
