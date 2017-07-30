import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameStateService } from '../../shared/gamestate.service';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(
    public gameState: GameStateService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

}
