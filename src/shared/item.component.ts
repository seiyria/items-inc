import { Component, Input } from '@angular/core';
import { Item } from './classes/item';

@Component({
  selector: 'item',
  template: `
  <ion-card>
    <ion-card-header>
      <ion-row justify-content-between>
        <ion-col col-10 col-sm-9 col-xs-8>
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
        <ion-col>
          <stat name="str" [value]="data.str"></stat>
        </ion-col>
        <ion-col>
          <stat name="agi" [value]="data.agi"></stat>
        </ion-col>
        <ion-col>
          <stat name="dex" [value]="data.dex"></stat>
        </ion-col>
        <ion-col>
          <stat name="con" [value]="data.con"></stat>
        </ion-col>
        <ion-col>
          <stat name="int" [value]="data.int"></stat>
        </ion-col>
        <ion-col>
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
