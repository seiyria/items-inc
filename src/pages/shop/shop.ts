import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameStateService } from '../../shared/gamestate.service';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  constructor(
    public gameState: GameStateService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewCanEnter() {
    return this.gameState.data.hasUpgrade('Item Shop');
  }

}
