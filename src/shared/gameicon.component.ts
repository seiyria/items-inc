import { Component, Input } from '@angular/core';

@Component({
  selector: 'game-icon',
  template: `<i class="itemicons itemicons-{{ size }} itemicons-{{ name }}"></i>`
})
export class GameIconComponent {
  @Input() public size = '';
  @Input() public name: string;
}
