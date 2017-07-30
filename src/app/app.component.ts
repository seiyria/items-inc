import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GameStateService } from '../shared/gamestate.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MainPage';

  pages: Array<{title: string, component: string, icon: string, shouldShow: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public gameState: GameStateService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tinker',    component: 'MainPage',      icon: 'symbol-tinker',
        shouldShow: () => true },
      { title: 'Storage',   component: 'StoragePage',   icon: 'symbol-storage',
        shouldShow: () => this.gameState.data.hasUpgrade('Storage') },
      { title: 'Item Shop', component: 'ShopPage',      icon: 'symbol-shop',
        shouldShow: () => this.gameState.data.hasUpgrade('Item Shop') },
      { title: 'Customers', component: 'CustomersPage', icon: 'symbol-customers',
        shouldShow: () => this.gameState.data.hasUpgrade('Customers') }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
