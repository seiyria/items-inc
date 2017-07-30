
import { Component, Input } from '@angular/core';

@Component({
  selector: 'stat',
  styles: [`
    :host .invisible {
      font-size: 0;
      color: rgba(0, 0, 0, 0);
    }
    
    .negative {
      color: red;
    }
    
    .positive {
      color: green;
    }
  `],
  template: `
    <span [class.positive]="value > 0" [class.negative]="value < 0">
      <game-icon size="lg" [name]="'stat-'+name"></game-icon> {{ value | number }} {{ name.toUpperCase() }}
    </span>
  `
})
export class StatComponent {
  @Input() public name: string;
  @Input() public value: number;
}
