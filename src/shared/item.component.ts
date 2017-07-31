import { Component, Input } from '@angular/core';
import { Item } from './classes/item';

@Component({
  selector: 'item',
  styles: [`
    .header {
      display: flex;
      flex-wrap: wrap;
    }
  `],
  template: `
  <ion-card>
    <ion-card-header>
      <ion-row justify-content-between>
        <ion-col col-md-10 col-sm-8 class="header">
          <strong>{{ data.name }}</strong>
          <ion-note>Value: {{ data.currentScore }}</ion-note>
        </ion-col>
        <ion-col text-right>
          <ion-badge [color]="'itemclass-'+data.itemClass">{{ data.type }}</ion-badge>
        </ion-col>
      </ion-row>
    </ion-card-header>
    
    <ion-card-content>
      <ion-row>
        <ion-col col-6 col-sm-4 col-md-2>
          <stat name="str" [value]="data.str"></stat>
        </ion-col>
        <ion-col col-6 col-sm-4 col-md-2>
          <stat name="agi" [value]="data.agi"></stat>
        </ion-col>
        <ion-col col-6 col-sm-4 col-md-2>
          <stat name="dex" [value]="data.dex"></stat>
        </ion-col>
        <ion-col col-6 col-sm-4 col-md-2>
          <stat name="con" [value]="data.con"></stat>
        </ion-col>
        <ion-col col-6 col-sm-4 col-md-2>
          <stat name="int" [value]="data.int"></stat>
        </ion-col>
        <ion-col col-6 col-sm-4 col-md-2>
          <stat name="luk" [value]="data.luk"></stat>
        </ion-col>
      </ion-row>
    </ion-card-content>
  </ion-card>
  
`
})
export class ItemComponent {
  @Input() public data: Item;
}
